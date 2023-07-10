import { BoardType } from "../entity/Board";
import { SharedBoardType } from "../entity/UserBoard";
import { IBoardDao } from "../interfaces/IBoardDao";
import { IBoardService } from "../interfaces/IBoardService";
import { BoardCreationPayload, BoardUpdatePayload } from "../types/BoardTypes";
import { StatusError } from "../utils/StatusErrors";

export class BoardService implements IBoardService {
	constructor(private readonly boardDao: IBoardDao) {}

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

	async getBoardWithColumns(
		boardId: string,
		userId: string
	): Promise<BoardType> {
		throw new Error("To be implemented");
	}
}
