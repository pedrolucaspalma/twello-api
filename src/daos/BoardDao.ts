import {
	CardCreationPayload,
	ColumnCreationPayload,
	CreateRelationParams,
	IBoardDao,
	OrganizeCardsParams,
	ReorderColumnParams,
	UpdateCardContent,
} from "../interfaces/IBoardDao";
import { BoardCreationPayload, BoardUpdatePayload } from "../types/BoardTypes";

import { IUserDao } from "../interfaces/IUserDao";
import { AppDataSource } from "../database/data-source";
import { Board, BoardType } from "../entity/Board";
import { UserBoard, SharedBoardType } from "../entity/UserBoard";
import { UserType } from "../entity/User";


export class BoardDao implements IBoardDao {
	constructor(private readonly userDao: IUserDao) { }
	async getBoardsSharedWithUser(userId: string): Promise<BoardType[] | []> {
	}

	async getBoardsOwnedByUser(userId: string): Promise<BoardType[]> {
	}

	async createBoard(data: BoardCreationPayload): Promise<BoardType | null> {
	}

	async deleteBoard(boardId: string): Promise<void> {
	}

	async getBoard(boardId: string): Promise<BoardType | null> {
	}

	async getRelationById(relationId: string): Promise<SharedBoardType | null> {
	}

	async getUserAssociationWithBoard(
		boardId: string,
		userId: string
	): Promise<SharedBoardType | null> {
	}

	async updateBoard(
		boardId: string,
		data: BoardUpdatePayload
	): Promise<BoardType | null> {
	}

	async listUsersRelatedToBoard(
		boardId: string
	): Promise<Array<SharedBoardType & { email: string }>> {
	}

	async createRelationBetweenUserAndBoard(
		params: CreateRelationParams
	): Promise<SharedBoardType | null> {
	}

	async deleteRelationBetweenUserAndBoard(associationId: string) {
	}

	async updateRelation(
		relationId: string,
		fields: { isFavorite: boolean; canEdit: boolean }
	): Promise<SharedBoardType | null> {
	}

	async addColumnToBoard(params: ColumnCreationPayload): Promise<void> { }

	async reorderColumns(params: ReorderColumnParams): Promise<void> { }

	async addCardToBoard(params: CardCreationPayload): Promise<void> { }

	async organizeCards(params: OrganizeCardsParams): Promise<void> { }

	async updateCardContent(params: UpdateCardContent): Promise<void> { }
}
