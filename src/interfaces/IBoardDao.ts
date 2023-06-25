import {
	Board,
	BoardCreationPayload,
	BoardUpdatePayload,
	UsersSharedBoardAssociation,
} from "../types/BoardTypes";

export interface IBoardDao {
	getBoardsSharedWithUser(userId: string): Promise<Board[]>;
	getBoardsOwnedByUser(userId: string): Promise<Board[]>;
	createBoard(data: BoardCreationPayload): Promise<void>;
	updateBoard(boardId: string, data: BoardUpdatePayload): Promise<void>;
	getBoard(boardId: string): Promise<Board | null>;
	getUserAssociationWithBoard(
		boardId: string,
		userId: string
	): Promise<UsersSharedBoardAssociation | null>;
}
