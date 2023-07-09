import { BoardService } from "../services/BoardService";
import { UserService } from "../services/UserService";
import { DaosFactory } from "./DaosFactory";

export class ServicesFactory {
	static makeUserService() {
		return new UserService(
			DaosFactory.makeUserDao(),
			DaosFactory.makeBoardDao()
		);
	}

	static makeBoardService() {
		return new BoardService(DaosFactory.makeBoardDao());
	}
}
