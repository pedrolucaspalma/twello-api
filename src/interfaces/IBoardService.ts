import { BoardCreationPayload } from "../types/BoardTypes";

export interface IBoardService {
	createBoard(payload: BoardCreationPayload): Promise<void>;
}
