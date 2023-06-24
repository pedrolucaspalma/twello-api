import { Board } from "../types/BoardTypes";

export interface IBoardDao {
	getBoardsSharedWithUser(userUuid: string): Promise<Board[]>;
	getBoardsOwnedByUser(userUuid: string): Promise<Board[]>;
}
