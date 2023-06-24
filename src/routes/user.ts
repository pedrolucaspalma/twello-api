import express from "express";
import { ControllersFactory } from "../factories/ControllersFactory";
const userController = ControllersFactory.makeUserController();

const router = express.Router();

router.post("/", userController.createUser());
router.get("/list", userController.listUsers());

export default router;
