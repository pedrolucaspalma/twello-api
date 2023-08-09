import { BoardType } from "../models/Board";
import { SharedBoardType } from "../models/UserBoard";
import { BoardCreationPayload, BoardUpdatePayload } from "../types/BoardTypes";

export interface IBoardService {
	createBoard(payload: BoardCreationPayload): Promise<BoardType | null>;
	getBoard(boardId: string): Promise<BoardType | null>;
	updateBoard(
		boardId: string,
		requestingUserId: string,
		data: BoardUpdatePayload
	): Promise<BoardType | null>;
	deleteBoard(boardId: string, requestingUserId: string): Promise<void>;
	isUserAllowedToEditBoard(userId: string, boardId: string): Promise<boolean>;
	updateRelationBetweenUserAndBoard(
		relationId: string,
		requestingUserId: string,
		fields: UpdateBoardRelationParams
	): Promise<SharedBoardType | null>;

	getBoardWithColumns(boardId: string, userId: string): Promise<BoardType>;
	getUserBoardAssociations(boardId: string): Promise<SharedBoardType[]>;
}

type UpdateBoardRelationParams = { isFavorite: boolean; canEdit: boolean };
