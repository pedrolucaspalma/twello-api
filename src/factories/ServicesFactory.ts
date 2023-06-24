import { BoardDao } from "../daos/BoardDao";
import { UserDao } from "../daos/UserDao";
import { BoardService } from "../services/BoardService";
import { UserService } from "../services/UserService";

export class ServicesFactory {
	static makeUserService() {
		return new UserService(new UserDao(), new BoardDao());
	}

	static makeBoardService() {
		return new BoardService(new BoardDao());
	}
}
