import { BoardCreationPayload, BoardUpdatePayload } from "../types/BoardTypes";

export interface IBoardService {
	createBoard(payload: BoardCreationPayload): Promise<void>;
	updateBoard(
		boardUuid: string,
		requestingUserUuid: string,
		data: BoardUpdatePayload
	): Promise<void>;
	isUserAllowedToEditBoard(
		userUuid: string,
		boardUuid: string
	): Promise<boolean>;
}
