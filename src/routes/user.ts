import express from "express";
import { ControllersFactory } from "../factories/ControllersFactory";
import { authenticationMiddleware } from "../middlewares/auth";
const userController = ControllersFactory.makeUserController();

const router = express.Router();

router.post("/sign-up", userController.createUser());
router.post("/sign-in", userController.signIn());

router.post("/request-change-password", userController.changePasswordRequest());

router.post("/change-password/", userController.changePassword());

router.get(
	"/my-boards",
	authenticationMiddleware(),
	userController.listMyBoards()
);

// This lists Users. It is mainly a testing endpoint
router.get("/list", authenticationMiddleware(), userController.listUsers());

export default router;
