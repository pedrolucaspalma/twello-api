import { BoardType } from "../entity/Board";
import { SharedBoardType } from "../entity/SharedBoards";
import { BoardCreationPayload, BoardUpdatePayload } from "../types/BoardTypes";
import { ShareBoardParams } from "./IUserService";

export interface IBoardDao {
	getBoardsSharedWithUser(userId: string): Promise<BoardType[]>;
	getBoardsOwnedByUser(userId: string): Promise<BoardType[]>;
	createBoard(data: BoardCreationPayload): Promise<BoardType | null>;
	updateBoard(
		boardId: string,
		data: BoardUpdatePayload
	): Promise<BoardType | null>;
	getBoard(boardId: string): Promise<BoardType | null>;
	getUserAssociationWithBoard(
		boardId: string,
		userId: string
	): Promise<SharedBoardType | null>;
	addColumnToBoard(params: ColumnCreationPayload): Promise<void>;
	addCardToBoard(params: CardCreationPayload): Promise<void>;
	createRelationBetweenUserAndBoard(
		params: ShareBoardParams
	): Promise<SharedBoardType | null>;
	reorderColumns(params: ReorderColumnParams): Promise<void>;
	organizeCards(params: OrganizeCardsParams): Promise<void>;
	updateCardContent(params: UpdateCardContent): Promise<void>;
}

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
