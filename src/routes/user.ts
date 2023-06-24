import express from "express";
import { ControllersFactory } from "../factories/ControllersFactory";
import { authenticationMiddleware } from "../middlewares/auth";
const userController = ControllersFactory.makeUserController();

const router = express.Router();

router.post("/sign-up", userController.createUser());
router.post("/sign-in", userController.signIn());

router.get(
	"/list-boards",
	authenticationMiddleware(),
	userController.listBoards()
);

// This lists Users. It is mainly a testing endpoint
router.get("/list", authenticationMiddleware(), userController.listUsers());

export default router;
