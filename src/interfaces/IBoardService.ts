import {
	Board,
	BoardCreationPayload,
	BoardUpdatePayload,
} from "../types/BoardTypes";

export interface IBoardService {
	createBoard(payload: BoardCreationPayload): Promise<void>;
	updateBoard(
		boardId: string,
		requestingUserId: string,
		data: BoardUpdatePayload
	): Promise<void>;
	isUserAllowedToEditBoard(userId: string, boardId: string): Promise<boolean>;
	getBoardWithColumns(boardId: string, userId: string): Promise<Board>;
}
