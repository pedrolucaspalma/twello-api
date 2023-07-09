import { BoardType } from "../entity/Board";
import { BoardCreationPayload, BoardUpdatePayload } from "../types/BoardTypes";

export interface IBoardService {
	createBoard(payload: BoardCreationPayload): Promise<BoardType | null>;
	updateBoard(
		boardId: string,
		requestingUserId: string,
		data: BoardUpdatePayload
	): Promise<BoardType | null>;
	isUserAllowedToEditBoard(userId: string, boardId: string): Promise<boolean>;
	getBoardWithColumns(boardId: string, userId: string): Promise<BoardType>;
}
