import { CreateUserPayload, SignInPayload } from "../../types/UserTypes";

export interface IUserService {
	createUser(userData: CreateUserPayload): Promise<void>;
	signIn(signInData: SignInPayload): Promise<string>;
}
