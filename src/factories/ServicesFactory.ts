import { BoardService } from "../services/BoardService";
import { EmailService } from "../services/EmailService";
import { UserService } from "../services/UserService";
import { CryptUtil } from "../utils/CryptUtil";
import { DaosFactory } from "./DaosFactory";

export class ServicesFactory {
	static makeUserService() {
		return new UserService(
			new CryptUtil(),
			ServicesFactory.makeEmailService(),
			DaosFactory.makeUserDao(),
			DaosFactory.makeBoardDao()
		);
	}

	static makeBoardService() {
		return new BoardService(DaosFactory.makeBoardDao());
	}

	static makeEmailService() {
		return new EmailService();
	}
}
