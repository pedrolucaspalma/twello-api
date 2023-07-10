import { In } from "typeorm";
import {
	CardCreationPayload,
	ColumnCreationPayload,
	CreateRelationParams,
	IBoardDao,
	OrganizeCardsParams,
	ReorderColumnParams,
	UpdateCardContent,
} from "../interfaces/IBoardDao";
import { BoardCreationPayload, BoardUpdatePayload } from "../types/BoardTypes";

import { IUserDao } from "../interfaces/IUserDao";
import { AppDataSource } from "../database/data-source";
import { Board, BoardType } from "../entity/Board";
import { UserBoard, SharedBoardType } from "../entity/UserBoard";
import { UserType } from "../entity/User";

const boardsRepository = AppDataSource.getRepository("Board");
const sharedBoardRepository = AppDataSource.getRepository("UserBoards");

export class BoardDao implements IBoardDao {
	constructor(private readonly userDao: IUserDao) {}
	async getBoardsSharedWithUser(userId: string): Promise<BoardType[] | []> {
		const boardRelations = (await sharedBoardRepository.find({
			where: { userId, isOwner: false },
		})) as SharedBoardType[];
		const boardIds = boardRelations.map((r) => r.boardId);

		const boards = (await boardsRepository.find({
			where: { id: In(boardIds) },
			order: { createdAt: "DESC" },
		})) as BoardType[];

		const formattedBoards: Array<
			BoardType & { isFavorite: boolean; relationId: string }
		> = [];

		for (const b of boards) {
			const association = boardRelations.find((r) => r.boardId === b.id);
			if (!association) continue;
			formattedBoards.push({
				...b,
				isFavorite: association.isFavorite,
				relationId: association.id,
			});
		}

		return formattedBoards;
	}

	async getBoardsOwnedByUser(userId: string): Promise<BoardType[]> {
		const boardRelations = (await sharedBoardRepository.find({
			where: { userId, isOwner: true },
		})) as SharedBoardType[];
		const boardIds = boardRelations.map((r) => r.boardId);

		const boards = (await boardsRepository.find({
			where: { id: In(boardIds) },
			order: { createdAt: "DESC" },
		})) as BoardType[];

		const formattedBoards: Array<
			BoardType & { isFavorite: boolean; relationId: string }
		> = [];

		for (const b of boards) {
			const association = boardRelations.find((r) => r.boardId === b.id);
			if (!association) continue;
			formattedBoards.push({
				...b,
				isFavorite: association.isFavorite,
				relationId: association.id,
			});
		}

		return formattedBoards;
	}

	async createBoard(data: BoardCreationPayload): Promise<BoardType | null> {
		const board = new Board();

		board.title = data.title ?? "New Board";
		board.backgroundColor = data.backgroundColor ?? "#FFFFFF";
		board.textColor = data.textColor ?? "#000000";
		await board.save();

		const association = new UserBoard();
		association.userId = data.ownerUserId;
		association.boardId = board.id;
		association.isOwner = true;
		association.canEdit = true;
		association.isFavorite = false;
		await association.save();

		return this.getBoard(board.id);
	}

	async deleteBoard(boardId: string): Promise<void> {
		const board = await boardsRepository.findOne({
			where: { id: boardId },
		});

		if (!board) return;
		await sharedBoardRepository.delete({ boardId });
		await boardsRepository.delete({ id: boardId });
	}

	async getBoard(boardId: string): Promise<BoardType | null> {
		const board = await boardsRepository.findOne({
			where: { id: boardId },
		});

		return board as BoardType;
	}

	async getRelationById(relationId: string): Promise<SharedBoardType | null> {
		const relation = await sharedBoardRepository.findOne({
			where: { id: relationId },
		});

		return relation as SharedBoardType;
	}

	async getUserAssociationWithBoard(
		boardId: string,
		userId: string
	): Promise<SharedBoardType | null> {
		const association = await sharedBoardRepository.findOne({
			where: { boardId, userId },
		});
		return association as SharedBoardType;
	}

	async updateBoard(
		boardId: string,
		data: BoardUpdatePayload
	): Promise<BoardType | null> {
		const board = await boardsRepository.findOne({ where: { id: boardId } });

		if (!board) return null;

		board.title = data.title ?? board.title;
		board.backgroundColor = data.backgroundColor ?? board.backgroundColor;
		board.textColor = data.textColor ?? board.textColor;
		board.content = data.content ?? board.content;
		await board.save();

		return this.getBoard(board.id);
	}

	async listUsersRelatedToBoard(
		boardId: string
	): Promise<Array<SharedBoardType & { email: string }>> {
		const associations = (await sharedBoardRepository.find({
			where: { boardId },
		})) as SharedBoardType[];

		const returnValues: Array<SharedBoardType & { email: string }> = [];

		for (const a of associations) {
			const user: UserType = await this.userDao.findById(a.userId);
			if (user) returnValues.push({ ...a, email: user.email });
		}
		return returnValues;
	}

	async createRelationBetweenUserAndBoard(
		params: CreateRelationParams
	): Promise<SharedBoardType | null> {
		const association = new UserBoard();
		association.userId = params.userId;
		association.boardId = params.boardId;
		association.canEdit = params.canEdit;
		association.isFavorite = false;
		await association.save();

		return this.getUserAssociationWithBoard(params.boardId, params.userId);
	}

	async deleteRelationBetweenUserAndBoard(associationId: string) {
		const association = await sharedBoardRepository.findOne({
			where: { id: associationId },
		});
		if (!association) return false;
		await association.remove();
		return true;
	}

	async updateRelation(
		relationId: string,
		fields: { isFavorite: boolean; canEdit: boolean }
	): Promise<SharedBoardType | null> {
		const relation = await sharedBoardRepository.findOne({
			where: { id: relationId },
		});
		if (!relation) return null;
		relation.isFavorite = fields.isFavorite ?? relation.isFavorite;
		relation.canEdit = fields.canEdit ?? relation.canEdit;
		await relation.save();
		return this.getRelationById(relationId);
	}

	async addColumnToBoard(params: ColumnCreationPayload): Promise<void> {}

	async reorderColumns(params: ReorderColumnParams): Promise<void> {}

	async addCardToBoard(params: CardCreationPayload): Promise<void> {}

	async organizeCards(params: OrganizeCardsParams): Promise<void> {}

	async updateCardContent(params: UpdateCardContent): Promise<void> {}
}
