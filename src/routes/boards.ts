import express from "express";
import { ControllersFactory } from "../factories/ControllersFactory";
import { authenticationMiddleware } from "../middlewares/auth";

const boardController = ControllersFactory.makeBoardController();

const router = express.Router();

router.post(
	"/create",
	authenticationMiddleware(),
	boardController.createBoard()
);

router.post(
	"/:id/share",
	authenticationMiddleware(),
	boardController.createAssociationWithUser()
);

router.put(
	"/:id/update",
	authenticationMiddleware(),
	boardController.updateBoard()
);

export default router;
