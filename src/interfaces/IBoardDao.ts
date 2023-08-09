import { BoardType } from "../models/Board";
import { SharedBoardType } from "../models/UserBoard";
import { BoardCreationPayload, BoardUpdatePayload } from "../types/BoardTypes";

export interface IBoardDao {
	getBoardsSharedWithUser(userId: string): Promise<BoardType[]>;
	getBoardsOwnedByUser(userId: string): Promise<BoardType[]>;
	createBoard(data: BoardCreationPayload): Promise<BoardType | null>;
	updateBoard(
		boardId: string,
		data: BoardUpdatePayload
	): Promise<BoardType | null>;

	deleteBoard(boardId: string): Promise<void>;
	getBoard(boardId: string): Promise<BoardType | null>;
	getUserAssociationWithBoard(
		boardId: string,
		userId: string
	): Promise<SharedBoardType | null>;
	addColumnToBoard(params: ColumnCreationPayload): Promise<void>;
	addCardToBoard(params: CardCreationPayload): Promise<void>;
	//
	createRelationBetweenUserAndBoard(
		params: CreateRelationParams
	): Promise<SharedBoardType | null>;
	deleteRelationBetweenUserAndBoard(associationId: string): Promise<any>;
	listUsersRelatedToBoard(boardId: string): Promise<SharedBoardType[]>;
	getRelationById(relationId: string): Promise<SharedBoardType | null>;
	updateRelation(
		relationId: string,
		fields: { isFavorite: boolean; canEdit: boolean }
	): Promise<SharedBoardType | null>;
	//
}

export type CreateRelationParams = {
	userId: string;
	boardId: string;
	canEdit: boolean;
};

export type CardCreationPayload = {
	columnId: string;
	index: number;
};

export type ColumnCreationPayload = {
	boardId: string;
	title?: string;
};

export type ReorderColumnParams = {
	id: number;
	index: number;
}[];

export type OrganizeCardsParams = {
	id: string;
	columnId: string;
	index: number;
}[];

export type UpdateCardContent = {
	id: string;
	content: string;
};
