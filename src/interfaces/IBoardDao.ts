import { Board, BoardCreationPayload } from "../types/BoardTypes";

export interface IBoardDao {
	getBoardsSharedWithUser(userUuid: string): Promise<Board[]>;
	getBoardsOwnedByUser(userUuid: string): Promise<Board[]>;
	createBoard(data: Board): Promise<void>;
}
