import { User, UserType } from "../entity/User";
import {
	CreateUserPayload,
	SignInPayload,
	UserBoardsList,
} from "../types/UserTypes";

export interface IUserService {
	createUser(userData: CreateUserPayload): Promise<createUserReturn>;
	signIn(signInData: SignInPayload): Promise<string>;
	listBoards(userId: string): Promise<UserBoardsList>;
}

export type createUserReturn = {
	user: UserType;
	token: string | null;
};
