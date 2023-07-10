import { Request, Response, NextFunction } from "express";
import { IUserDao } from "../interfaces/IUserDao";
import { IUserService, CreateUserReturn } from "../interfaces/IUserService";
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
				.then((data: CreateUserReturn) => res.status(201).send(data))
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

	listBoards() {
		return (req: Request, res: Response, next: NextFunction) => {
			const { id: id } = req.user;
			return this.userService
				.listBoards(id)
				.then((boards) => res.status(200).send({ boards }))
				.catch(next);
		};
	}

	shareBoardWithUser() {
		return (req: Request, res: Response, next: NextFunction) => {
			const { boardId, userId, canEdit } = req.body;
			const { id: requestingUserId } = req.user;
			return this.userService
				.shareBoardWithUser(
					{ boardId, userEmail: userId, canEdit },
					requestingUserId
				)
				.then((data) => res.status(200).send(data))
				.catch(next);
		};
	}
}
