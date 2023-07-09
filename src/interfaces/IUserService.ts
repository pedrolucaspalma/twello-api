import { SharedBoardType } from "../entity/SharedBoards";
import { UserType } from "../entity/User";
import {
	CreateUserPayload,
	SignInPayload,
	UserBoardsList,
} from "../types/UserTypes";

export interface IUserService {
	createUser(userData: CreateUserPayload): Promise<CreateUserReturn>;
	signIn(signInData: SignInPayload): Promise<string>;
	listBoards(userId: string): Promise<UserBoardsList>;
	shareBoardWithUser(
		params: ShareBoardParams,
		requestingUserId: string
	): Promise<SharedBoardType | null>;
}

export type CreateUserReturn = {
	user: UserType | null;
	token: string | null;
};

export type ShareBoardParams = {
	boardId: string;
	userId: string;
	canEdit: boolean;
};
