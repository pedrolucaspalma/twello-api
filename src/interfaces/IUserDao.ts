import { User } from "../types/UserTypes";
import { CreateUserPayload } from "../types/UserTypes";

export interface IUserDao {
	findByUuid(uuid: string): Promise<User>;
	findByEmail(email: String): Promise<User>;
	create(userCreationPayload: CreateUserPayload): Promise<void>;

	checkEmailAvailability(email: string): Promise<boolean>;
}
