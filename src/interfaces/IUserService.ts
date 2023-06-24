import { CreateUserPayload, SignInPayload } from "../types/UserTypes";

export interface IUserInterface {
	createUser(userData: CreateUserPayload): Promise<void>;
	signIn(signInData: SignInPayload): Promise<string>;
}
