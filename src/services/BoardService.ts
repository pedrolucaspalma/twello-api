import { IBoardDao } from "../interfaces/IBoardDao";
import { IBoardService } from "../interfaces/IBoardService";
import { BoardCreationPayload, BoardUpdatePayload } from "../types/BoardTypes";
import { StatusError } from "../utils/StatusErrors";

export class BoardService implements IBoardService {
	constructor(private readonly boardDao: IBoardDao) {}

	async createBoard(payload: BoardCreationPayload): Promise<void> {
		await this.boardDao.createBoard(payload);
	}

	async updateBoard(
		boardUuid: string,
		requestingUserUuid: string,
		data: BoardUpdatePayload
	): Promise<void> {
		const board = await this.boardDao.getBoard(boardUuid);
		if (!board) throw new StatusError(404, "Board not found");

		const isAllowed = await this.isUserAllowedToEditBoard(
			requestingUserUuid,
			boardUuid
		);
		if (!isAllowed)
			throw new StatusError(401, "User unauthorized to perform this action");

		await this.boardDao.updateBoard(boardUuid, data);
	}

	async isUserAllowedToEditBoard(
		userUuid: string,
		boardUuid: string
	): Promise<boolean> {
		const association = await this.boardDao.getUserAssociationWithBoard(
			boardUuid,
			userUuid
		);
		if (!association) return false;
		return association.canEdit;
	}
}
