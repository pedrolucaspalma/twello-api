import { CreateUserPayload } from "../types/UserTypes";

export interface IUserInterface {
	createUser(userData: CreateUserPayload): Promise<void>;
}
