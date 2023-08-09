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
import { Board, BoardType } from "../models/Board";
import { UserBoard, SharedBoardType } from "../models/UserBoard";
import { UserType } from "../models/User";


export class BoardDao implements IBoardDao {
	constructor(private readonly userDao: IUserDao) { }
	async getBoardsSharedWithUser(userId: string): Promise<BoardType[] | []> {
		throw new Error("not implemented")
	}

	async getBoardsOwnedByUser(userId: string): Promise<BoardType[]> {
		throw new Error("not implemented")
	}

	async createBoard(data: BoardCreationPayload): Promise<BoardType | null> {
		throw new Error("not implemented")
	}

	async deleteBoard(boardId: string): Promise<void> {
		throw new Error("not implemented")
	}

	async getBoard(boardId: string): Promise<BoardType | null> {
		throw new Error("not implemented")
	}

	async getRelationById(relationId: string): Promise<SharedBoardType | null> {
		throw new Error("not implemented")
	}

	async getUserAssociationWithBoard(
		boardId: string,
		userId: string
	): Promise<SharedBoardType | null> {
		throw new Error("not implemented")
	}

	async updateBoard(
		boardId: string,
		data: BoardUpdatePayload
	): Promise<BoardType | null> {
		throw new Error("not implemented")
	}

	async listUsersRelatedToBoard(
		boardId: string
	): Promise<Array<SharedBoardType & { email: string }>> {
		throw new Error("not implemented")
	}

	async createRelationBetweenUserAndBoard(
		params: CreateRelationParams
	): Promise<SharedBoardType | null> {
		throw new Error("not implemented")
	}

	async deleteRelationBetweenUserAndBoard(associationId: string) {
		throw new Error("not implemented")
	}

	async updateRelation(
		relationId: string,
		fields: { isFavorite: boolean; canEdit: boolean }
	): Promise<SharedBoardType | null> {
		throw new Error("not implemented")
	}

	async addColumnToBoard(params: ColumnCreationPayload): Promise<void> { }

	async reorderColumns(params: ReorderColumnParams): Promise<void> { }

	async addCardToBoard(params: CardCreationPayload): Promise<void> { }

	async organizeCards(params: OrganizeCardsParams): Promise<void> { }

	async updateCardContent(params: UpdateCardContent): Promise<void> { }
}
