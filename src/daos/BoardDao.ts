import { In } from "typeorm";
import {
	CardCreationPayload,
	ColumnCreationPayload,
	IBoardDao,
	OrganizeCardsParams,
	ReorderColumnParams,
	UpdateCardContent,
} from "../interfaces/IBoardDao";
import { BoardCreationPayload, BoardUpdatePayload } from "../types/BoardTypes";

import { IUserDao } from "../interfaces/IUserDao";
import { AppDataSource } from "../database/data-source";
import { Board, BoardType } from "../entity/Board";
import { SharedBoard, SharedBoardType } from "../entity/SharedBoards";
import { ShareBoardParams } from "../interfaces/IUserService";

const boardsRepository = AppDataSource.getRepository("Board");
const sharedBoardRepository = AppDataSource.getRepository("SharedBoards");

export class BoardDao implements IBoardDao {
	constructor(private readonly userDao: IUserDao) {}
	async getBoardsSharedWithUser(userId: string): Promise<BoardType[] | []> {
		const boardIds: string[] = await sharedBoardRepository
			.find({
				where: { userId },
			})
			.then((associations) => associations.map((a) => a.boardId));
		const boards = await boardsRepository.find({
			where: { id: In(boardIds) },
			order: { createdAt: "DESC" },
		});
		return boards as BoardType[];
	}

	async getBoardsOwnedByUser(userId: string): Promise<BoardType[]> {
		const boardsOwned = await boardsRepository.find({
			where: { ownerUserId: userId },
			order: { createdAt: "DESC" },
		});
		return boardsOwned as BoardType[];
	}

	async createBoard(data: BoardCreationPayload): Promise<BoardType | null> {
		const board = new Board();
		board.ownerUserId = data.ownerUserId;

		board.title = data.title ?? "New Board";
		board.backgroundColor = data.backgroundColor ?? "#FFFFFF";
		board.textColor = data.textColor ?? "#000000";

		await board.save();

		return this.getBoard(board.id);
	}

	async getBoard(boardId: string): Promise<BoardType | null> {
		const board = await boardsRepository.findOne({
			where: { id: boardId },
		});

		return board as BoardType;
	}

	async getUserAssociationWithBoard(
		boardId: string,
		userId: string
	): Promise<SharedBoardType | null> {
		const association = await sharedBoardRepository.findOne({
			where: { boardId, userId },
		});
		return association as SharedBoardType;
	}

	async updateBoard(
		boardId: string,
		data: BoardUpdatePayload
	): Promise<BoardType | null> {
		const board = await boardsRepository.findOne({
			where: { id: boardId },
		});

		if (!board) return null;

		board.title = data.title ?? board.title;
		board.backgroundColor = data.backgroundColor ?? board.backgroundColor;
		board.textColor = data.textColor ?? board.textColor;
		await board.save();

		return this.getBoard(board.id);
	}

	async createRelationBetweenUserAndBoard(
		params: ShareBoardParams
	): Promise<SharedBoardType | null> {
		const association = new SharedBoard();
		association.userId = params.userId;
		association.boardId = params.boardId;
		association.canEdit = params.canEdit;
		association.isFavorite = false;
		await association.save();

		return this.getUserAssociationWithBoard(params.boardId, params.userId);
	}

	async addColumnToBoard(params: ColumnCreationPayload): Promise<void> {}

	async reorderColumns(params: ReorderColumnParams): Promise<void> {}

	async addCardToBoard(params: CardCreationPayload): Promise<void> {}

	async organizeCards(params: OrganizeCardsParams): Promise<void> {}

	async updateCardContent(params: UpdateCardContent): Promise<void> {}
}
