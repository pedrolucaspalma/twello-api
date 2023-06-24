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
	async getBoardsSharedWithUser(userUuid: string): Promise<Board[] | []> {
		const boardUuids: string[] = [];
		for (const shared of usersSharedBoardsTable) {
			if (shared.userUuid !== userUuid) continue;
			boardUuids.push(shared.boardUuid);
		}

		const boards = boardUuids.map((boardUuid) => {
			const board = boardsTable.find((board) => board.uuid === boardUuid);
			return board;
		});

		return boards as Board[];
	}

	async getBoardsOwnedByUser(userUuid: string): Promise<Board[]> {
		const boardsOwned: Board[] = [];
		for (const board of boardsTable) {
			if (board.ownerUserUuid !== userUuid) continue;
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
			uuid: v4(),
			createdAt: new Date().getTime(),
		};

		boardsTable.push(formattedData);
	}

	async getBoard(boardUuid: string): Promise<Board | null> {
		const board = boardsTable.find((board) => board.uuid === boardUuid);
		if (!board) return null;
		return board;
	}

	async getUserAssociationWithBoard(
		boardUuid: string,
		userUuid: string
	): Promise<UsersSharedBoardAssociation> {
		const association = usersSharedBoardsTable.find(
			(association) =>
				association.boardUuid === boardUuid && association.userUuid === userUuid
		);

		if (!association) return null;
		return association;
	}

	async updateBoard(
		boardUuid: string,
		data: BoardUpdatePayload
	): Promise<void> {
		const board = boardsTable.find((board) => board.uuid === boardUuid);
		if (!board) return;
		if (data.title) board.title = data.title;
		if (data.backgroundColor) board.backgroundColor = data.backgroundColor;
		if (data.textColor) board.textColor = data.textColor;
	}
}
