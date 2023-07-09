import { BoardController } from "../controllers/BoardController";
import { UserController } from "../controllers/UserController";
import { DaosFactory } from "./DaosFactory";
import { ServicesFactory } from "./ServicesFactory";

export class ControllersFactory {
	static makeUserController() {
		return new UserController(
			ServicesFactory.makeUserService(),
			DaosFactory.makeUserDao()
		);
	}

	static makeBoardController() {
		return new BoardController(ServicesFactory.makeBoardService());
	}
}
