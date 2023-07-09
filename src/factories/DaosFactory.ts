import { BoardDao } from "../daos/BoardDao";
import { UserDao } from "../daos/UserDao";

export class DaosFactory {
	static makeUserDao() {
		return new UserDao();
	}

	static makeBoardDao() {
		return new BoardDao(this.makeUserDao());
	}
}
