import { v4 } from "uuid";
import {
	boardsTable,
	cardsTable,
	columnsTable,
	usersSharedBoardsTable,
} from "../database";
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
	Card,
	Column,
	UsersSharedBoardAssociation,
} from "../types/BoardTypes";

import { IUserDao } from "../interfaces/IUserDao";
import { AppDataSource } from "../database/data-source";
import { Board, BoardType } from "../entity/Board";

const boardsRepository = AppDataSource.getRepository("Board");

export class BoardDao implements IBoardDao {
	constructor(private readonly userDao: IUserDao) {}
	async getBoardsSharedWithUser(userId: string): Promise<BoardType[] | []> {
		const boardIds: string[] = [];
		for (const shared of usersSharedBoardsTable) {
			if (shared.userId !== userId) continue;
			boardIds.push(shared.boardId);
		}

		const boards = boardIds.map((boardId) => {
			const board = boardsTable.find((board) => board.id === boardId);
			return board;
		});

		return boards as BoardType[];
	}

	async getBoardsOwnedByUser(userId: string): Promise<BoardType[]> {
		const boardsOwned: Board[] = [];
		for (const board of boardsTable) {
			if (board.ownerUserId !== userId) continue;
			boardsOwned.push(board);
		}
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
		const association = usersSharedBoardsTable.find(
			(association) =>
				association.boardId === boardId && association.userId === userId
		);

		if (!association) return null;
		return association;
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

	async addColumnToBoard(params: ColumnCreationPayload): Promise<void> {
		const newColumn: Column = {
			id: v4(),
			index: 0, // precisa ser o maior indice das colunas existentes no board
			boardId: params.boardId,
			title: params.title ?? "New Column",
		};
		columnsTable.push(newColumn);
	}

	async reorderColumns(params: ReorderColumnParams): Promise<void> {
		// mais facil com sql
	}

	async addCardToBoard(params: CardCreationPayload): Promise<void> {
		const newCard: Card = {
			id: v4(),
			index: 0, // precisa ser o maior indice...
			columnId: params.columnId,
			content: null,
			createdAt: new Date().getTime(),
			updatedAt: new Date().getTime(),
		};
		cardsTable.push(newCard);
	}

	async organizeCards(params: OrganizeCardsParams): Promise<void> {
		// mais facil com sql
	}

	async updateCardContent(params: UpdateCardContent): Promise<void> {
		// mais facil com sql
	}
}
