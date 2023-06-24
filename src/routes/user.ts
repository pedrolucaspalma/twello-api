import express from "express";
import { ControllersFactory } from "../factories/ControllersFactory";
const userController = ControllersFactory.makeUserController();

const router = express.Router();

router.post("/sign-in", userController.signIn());
router.get("/list", userController.listUsers());
router.post("/", userController.createUser());

export default router;
