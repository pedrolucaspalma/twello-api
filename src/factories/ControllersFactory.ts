import { BoardController } from "../controllers/BoardController";
import { UserController } from "../controllers/UserController";
import { UserDao } from "../daos/UserDao";
import { ServicesFactory } from "./ServicesFactory";

export class ControllersFactory {
	static makeUserController() {
		return new UserController(ServicesFactory.makeUserService(), new UserDao());
	}

	static makeBoardController() {
		return new BoardController(ServicesFactory.makeBoardService());
	}
}
