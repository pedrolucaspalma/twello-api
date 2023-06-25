import express from "express";
import { ControllersFactory } from "../factories/ControllersFactory";
import { authenticationMiddleware } from "../middlewares/auth";

const boardController = ControllersFactory.makeBoardController();

const router = express.Router();

router.put(
	"/:uuid/update",
	authenticationMiddleware(),
	boardController.updateBoard()
);

export default router;
