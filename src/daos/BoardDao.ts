import {
	CardCreationPayload,
	ColumnCreationPayload,
	IBoardDao,
	OrganizeCardsParams,
	ReorderColumnParams,
	UpdateCardContent,
} from "../interfaces/IBoardDao";
import {
	BoardCreationPayload,
	BoardUpdatePayload,
	UsersSharedBoardAssociation,
} from "../types/BoardTypes";

import { IUserDao } from "../interfaces/IUserDao";
import { AppDataSource } from "../database/data-source";
import { Board, BoardType } from "../entity/Board";

const boardsRepository = AppDataSource.getRepository("Board");

export class BoardDao implements IBoardDao {
	constructor(private readonly userDao: IUserDao) {}
	async getBoardsSharedWithUser(userId: string): Promise<BoardType[] | []> {
		const boardIds: BoardType[] = [];

		return boardIds;
	}

	async getBoardsOwnedByUser(userId: string): Promise<BoardType[]> {
		const boardsOwned: BoardType[] = [];

		return boardsOwned;
	}

	async createBoard(data: BoardCreationPayload): Promise<BoardType | null> {
		// These defaults are here because they will be handled by the defaultValues set in database columns

		const board = new Board();
		board.ownerUserId = data.ownerUserId;

		board.title = data.title ?? "New Board";
		board.backgroundColor = data.backgroundColor ?? "#FFFFFF";
		board.textColor = data.textColor ?? "#000000";

		await board.save();

		return this.getBoard(board.id);
	}

	async getBoard(boardId: string): Promise<BoardType | null> {
		const board = await boardsRepository.findOne({
			where: { id: boardId },
		});

		return board as BoardType;
	}

	async getUserAssociationWithBoard(
		boardId: string,
		userId: string
	): Promise<UsersSharedBoardAssociation | null> {
		return null;
	}

	async updateBoard(
		boardId: string,
		data: BoardUpdatePayload
	): Promise<BoardType | null> {
		const board = await boardsRepository.findOne({
			where: { id: boardId },
		});

		if (!board) return null;

		board.title = data.title ?? board.title;
		board.backgroundColor = data.backgroundColor ?? board.backgroundColor;
		board.textColor = data.textColor ?? board.textColor;
		await board.save();
		return this.getBoard(board.id);
	}

	async addColumnToBoard(params: ColumnCreationPayload): Promise<void> {}

	async reorderColumns(params: ReorderColumnParams): Promise<void> {
		// mais facil com sql
	}

	async addCardToBoard(params: CardCreationPayload): Promise<void> {}

	async organizeCards(params: OrganizeCardsParams): Promise<void> {}

	async updateCardContent(params: UpdateCardContent): Promise<void> {}
}
