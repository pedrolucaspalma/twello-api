import { Request, Response, NextFunction } from "express";
import { IBoardService } from "../interfaces/IBoardService";

export class BoardController {
	constructor(private readonly boardService: IBoardService) {}

	updateBoard() {
		return (req: Request, res: Response, next: NextFunction) => {
			const { uuid } = req.user;
			const { boardUuid } = req.params;
			const data = req.body;

			return this.boardService
				.updateBoard(boardUuid, uuid, data)
				.then(() => res.status(200).send())
				.catch(next);
		};
	}
}
