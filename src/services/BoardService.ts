import { BoardType } from "../models/Board";
import { SharedBoardType } from "../models/UserBoard";
import { IBoardDao } from "../interfaces/IBoardDao";
import { IBoardService } from "../interfaces/IBoardService";
import { BoardCreationPayload, BoardUpdatePayload } from "../types/BoardTypes";
import { StatusError } from "../utils/StatusErrors";

export class BoardService implements IBoardService {
	constructor(private readonly boardDao: IBoardDao) { }

	async getBoard(boardId: string): Promise<BoardType | null> {
		return this.boardDao.getBoard(boardId);
	}

	async createBoard(payload: BoardCreationPayload): Promise<BoardType | null> {
		if (!payload || !payload.ownerUserId)
			throw new StatusError(400, "Every board must have a owner");
		return this.boardDao.createBoard(payload);
	}

	async updateBoard(
		boardId: string,
		requestingUserId: string,
		data: BoardUpdatePayload
	): Promise<BoardType | null> {
		const board = await this.boardDao.getBoard(boardId);
		if (!board) throw new StatusError(404, "Board not found");

		const isAllowed = await this.isUserAllowedToEditBoard(
			requestingUserId,
			boardId
		);
		if (!isAllowed)
			throw new StatusError(401, "User unauthorized to perform this action");

		return this.boardDao.updateBoard(boardId, data);
	}

	async deleteBoard(boardId: string, requestingUserId: string): Promise<void> {
		const board = await this.boardDao.getBoard(boardId);
		if (!board) throw new StatusError(404, "Board not found");
		const relation = await this.boardDao.getUserAssociationWithBoard(
			boardId,
			requestingUserId
		);
		if (!relation?.isOwner)
			throw new StatusError(401, "Only the owner of the board can delete it");
		await this.boardDao.deleteBoard(boardId);
	}

	async isUserAllowedToEditBoard(
		userId: string,
		boardId: string
	): Promise<boolean> {
		const association = await this.boardDao.getUserAssociationWithBoard(
			boardId,
			userId
		);
		return !!association?.isOwner || !!association?.canEdit;
	}

	async getUserBoardAssociations(boardId: string): Promise<SharedBoardType[]> {
		const board = await this.boardDao.getBoard(boardId);
		if (!board) throw new StatusError(404, "Board not found");

		return this.boardDao.listUsersRelatedToBoard(boardId);
	}

	async updateRelationBetweenUserAndBoard(
		relationId: string,
		requestingUserId: string,
		fields: { isFavorite: boolean; canEdit: boolean }
	): Promise<SharedBoardType | null> {
		const relation = await this.boardDao.getRelationById(relationId);
		if (!relation) throw new StatusError(404, "Relation not found");

		if (relation.userId === requestingUserId) {
			if (!relation.isOwner) {
				fields.canEdit = relation.canEdit;
			} else {
				fields.canEdit = true;
			}
			return this.boardDao.updateRelation(relationId, fields);
		}

		const requestingRelation = await this.boardDao.getUserAssociationWithBoard(
			relation.boardId,
			requestingUserId
		);
		if (!requestingRelation?.isOwner) throw new StatusError(403, "Forbidden");

		fields.isFavorite = relation.isFavorite;
		return this.boardDao.updateRelation(relationId, fields);
	}

	async getBoardWithColumns(
		boardId: string,
		userId: string
	): Promise<BoardType> {
		throw new Error("To be implemented");
	}
}
