import express from "express";
import { ControllersFactory } from "../factories/ControllersFactory";
import { authenticationMiddleware } from "../middlewares/auth";

const router = express.Router();

export default router;
