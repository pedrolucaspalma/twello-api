import { Request, Response, NextFunction } from "express";
import { IBoardService } from "../interfaces/IBoardService";
import { BoardCreationPayload } from "../types/BoardTypes";

export class BoardController {
	constructor(private readonly boardService: IBoardService) {}

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
				.then(() => res.status(200).send())
				.catch(next);
		};
	}
}
