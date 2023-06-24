import {
	Board,
	BoardCreationPayload,
	BoardUpdatePayload,
} from "../types/BoardTypes";

export interface IBoardDao {
	getBoardsSharedWithUser(userUuid: string): Promise<Board[]>;
	getBoardsOwnedByUser(userUuid: string): Promise<Board[]>;
	createBoard(data: BoardCreationPayload): Promise<void>;
	updateBoard(boardUuid: string, data: BoardUpdatePayload): Promise<void>;
	getBoard(boardUuid: string): Promise<Board | null>;
}
