import { boardsTable, usersSharedBoardsTable } from "../database";
import { IBoardDao } from "../interfaces/IBoardDao";
import { Board, UsersSharedBoardAssociation } from "../types/BoardTypes";

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
			if (board.creatorUserUuid !== userUuid) continue;
			boardsOwned.push(board);
		}
		return boardsOwned;
	}
}
