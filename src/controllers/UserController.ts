import { Request, Response, NextFunction } from "express";
import { IUserDao } from "../interfaces/IUserDao";
import { IUserService } from "../interfaces/IUserService";
export class UserController {
	constructor(
		private readonly userService: IUserService,
		private readonly userDao: IUserDao
	) {}

	listUsers() {
		return (req: Request, res: Response, next: NextFunction) => {
			return this.userDao
				.listUsers()
				.then((users) => res.status(200).send(users))
				.catch(next);
		};
	}

	createUser() {
		return (req: Request, res: Response, next: NextFunction) => {
			const data = req.body;
			return this.userService
				.createUser(data)
				.then(() => res.status(201).send())
				.catch(next);
		};
	}

	signIn() {
		return (req: Request, res: Response, next: NextFunction) => {
			const data = req.body;
			return this.userService
				.signIn(data)
				.then((token) => res.status(200).send({ token }))
				.catch(next);
		};
	}
}
