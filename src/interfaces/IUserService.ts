import { SharedBoardType } from "../entity/UserBoard";
import { UserType } from "../entity/User";
import {
	CreateUserPayload,
	SignInPayload,
	UserBoardsList,
} from "../types/UserTypes";

export interface IUserService {
	createUser(userData: CreateUserPayload): Promise<CreateUserReturn>;
	signIn(signInData: SignInPayload): Promise<CreateUserReturn>;
	listBoards(userId: string): Promise<UserBoardsList>;

	shareBoardWithUser(
		params: ShareBoardParams,
		requestingUserId: string
	): Promise<SharedBoardType | null>;

	deleteUserBoardAssociation(
		params: UnshareBoard,
		requestingUserId: string
	): Promise<boolean>;
}

export type CreateUserReturn = {
	user: UserType | null;
	token: string | null;
};

export type ShareBoardParams = {
	boardId: string;
	userEmail: string;
	canEdit: boolean;
};

export type UnshareBoard = {
	boardId: string;
	userId: string;
};
