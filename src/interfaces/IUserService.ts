import {
	CreateUserPayload,
	SignInPayload,
	User,
	UserBoardsList,
} from "../types/UserTypes";

export interface IUserService {
	createUser(userData: CreateUserPayload): Promise<createUserReturn>;
	signIn(signInData: SignInPayload): Promise<string>;
	listBoards(userId: string): Promise<UserBoardsList>;
}

export type createUserReturn = {
	user: User | null;
	token: string | null;
};
