import express from "express";
import { readdirSync } from "fs";
import { UserController } from "./controllers/UserController";

const router = express.Router();

router.get("/", (req, res, next) => {
	res.send({
		api: "twello Main API",
		message: "Hello!",
	});
});

export default router;
