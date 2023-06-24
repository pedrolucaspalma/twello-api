import { BoardDao } from "../daos/BoardDao";
import { UserDao } from "../daos/UserDao";
import { UserService } from "../services/UserService";

export class ServicesFactory {
	static makeUserService() {
		return new UserService(new UserDao(), new BoardDao());
	}
}
