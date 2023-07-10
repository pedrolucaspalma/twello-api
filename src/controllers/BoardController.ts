import { Request, Response, NextFunction } from "express";
import { IBoardService } from "../interfaces/IBoardService";
import { BoardCreationPayload } from "../types/BoardTypes";
import { IUserService } from "../interfaces/IUserService";

export class BoardController {
	constructor(
		private readonly boardService: IBoardService,
		private readonly userService: IUserService
	) {}

	updateBoard() {
		return (req: Request, res: Response, next: NextFunction) => {
			const { id } = req.user;
			const { boardId } = req.params;
			const data = req.body;

			return this.boardService
				.updateBoard(boardId, id, data)
				.then(() => res.status(200).send())
				.catch(next);
		};
	}

	createBoard() {
		return (req: Request, res: Response, next: NextFunction) => {
			const { id } = req.user;
			const data: Omit<BoardCreationPayload, "ownerUserId"> = req.body;
			const params: BoardCreationPayload = { ...data, ownerUserId: id };

			return this.boardService
				.createBoard(params)
				.then((data) => res.status(200).send(data))
				.catch(next);
		};
	}

	deleteAssociationWithUser() {
		return (req: Request, res: Response, next: NextFunction) => {
			const { id } = req.user;
			const { boardId, userId } = req.body;

			return this.userService
				.deleteUserBoardAssociation({ boardId, userId }, id)
				.then(() => res.status(200).send())
				.catch(next);
		};
	}

	createAssociationWithUser() {
		return (req: Request, res: Response, next: NextFunction) => {
			const { id } = req.params;
			const { userEmail, canEdit } = req.body;
			const { id: requestingUserId } = req.user;
			return this.userService
				.shareBoardWithUser(
					{ boardId: id, userEmail, canEdit },
					requestingUserId
				)
				.then((data) => res.status(200).send(data))
				.catch(next);
		};
	}
}
