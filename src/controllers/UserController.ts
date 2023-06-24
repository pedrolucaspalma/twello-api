import { Request, Response, NextFunction } from "express";
import { IUserDao } from "../interfaces/IUserDao";
import { IUserService } from "../interfaces/IUserService";
export class UserController {
	constructor(
		private readonly userService: IUserService,
		private readonly userDao: IUserDao
	) {}

	listUsers() {
		return async (req: Request, res: Response, next: NextFunction) => {
			const users = await this.userDao.listUsers();
			res.status(200).send(users);
		};
	}
}
