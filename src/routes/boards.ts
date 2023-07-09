import express from "express";
import { ControllersFactory } from "../factories/ControllersFactory";
import { authenticationMiddleware } from "../middlewares/auth";

const boardController = ControllersFactory.makeBoardController();

const router = express.Router();

router.put(
	"/:id/update",
	authenticationMiddleware(),
	boardController.updateBoard()
);

router.post(
	"/create",
	authenticationMiddleware(),
	boardController.createBoard()
);

export default router;
