import {
	CreateUserPayload,
	SignInPayload,
	UserBoardsList,
} from "../types/UserTypes";

export interface IUserService {
	createUser(userData: CreateUserPayload): Promise<void>;
	signIn(signInData: SignInPayload): Promise<string>;
	listBoards(userUuid: string): Promise<UserBoardsList>;
}
