import { IBoardDao } from "../interfaces/IBoardDao";
import { IBoardService } from "../interfaces/IBoardService";
import { BoardCreationPayload } from "../types/BoardTypes";

export class BoardService implements IBoardService {
	constructor(private readonly boardDao: IBoardDao) {}

	async createBoard(payload: BoardCreationPayload): Promise<void> {
		await this.boardDao.createBoard(payload);
	}
}
