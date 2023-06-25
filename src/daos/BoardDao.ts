import { v4 } from "uuid";
import { boardsTable, usersSharedBoardsTable } from "../database";
import { IBoardDao } from "../interfaces/IBoardDao";
import {
	Board,
	BoardCreationPayload,
	BoardUpdatePayload,
	UsersSharedBoardAssociation,
} from "../types/BoardTypes";

export class BoardDao implements IBoardDao {
	async getBoardsSharedWithUser(userId: string): Promise<Board[] | []> {
		const boardIds: string[] = [];
		for (const shared of usersSharedBoardsTable) {
			if (shared.userId !== userId) continue;
			boardIds.push(shared.boardId);
		}

		const boards = boardIds.map((boardId) => {
			const board = boardsTable.find((board) => board.id === boardId);
			return board;
		});

		return boards as Board[];
	}

	async getBoardsOwnedByUser(userId: string): Promise<Board[]> {
		const boardsOwned: Board[] = [];
		for (const board of boardsTable) {
			if (board.ownerUserId !== userId) continue;
			boardsOwned.push(board);
		}
		return boardsOwned;
	}

	async createBoard(data: BoardCreationPayload): Promise<void> {
		// These defaults are here because they will be handled by the defaultValues set in database columns
		let defaultTitle = "New Board";
		let defaultBackgroundColor = "#FFFFFF";
		let defaultTextColor = "#000000";
		const formattedData: Board = {
			title: defaultTitle,
			backgroundColor: defaultBackgroundColor,
			textColor: defaultTextColor,
			...data,
			id: v4(),
			createdAt: new Date().getTime(),
		};

		boardsTable.push(formattedData);
	}

	async getBoard(boardId: string): Promise<Board | null> {
		const board = boardsTable.find((board) => board.id === boardId);
		if (!board) return null;
		return board;
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

	async updateBoard(boardId: string, data: BoardUpdatePayload): Promise<void> {
		const board = boardsTable.find((board) => board.id === boardId);
		if (!board) return;
		if (data.title) board.title = data.title;
		if (data.backgroundColor) board.backgroundColor = data.backgroundColor;
		if (data.textColor) board.textColor = data.textColor;
	}
}
