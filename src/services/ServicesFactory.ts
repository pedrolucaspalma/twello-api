import { UserDao } from "../daos/UserDao";
import { UserService } from "./UserService";

export class ServicesFactory {
	makeUserService() {
		return new UserService(new UserDao());
	}
}
