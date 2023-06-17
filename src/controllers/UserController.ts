import { Request, Response } from "express";
export class UserController {
	listUsers() {
		return (req: Request, res: Response) => {
			res.status(200).send({ deu: "bom" });
		};
	}
}
