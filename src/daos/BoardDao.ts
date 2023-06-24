import { v4 } from "uuid";
import { boardsTable, usersSharedBoardsTable } from "../database";
import { IBoardDao } from "../interfaces/IBoardDao";
import {
	Board,
	BoardCreationPayload,
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
}
