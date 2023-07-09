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
}

export type CreateUserReturn = {
	user: UserType | null;
	token: string | null;
};
