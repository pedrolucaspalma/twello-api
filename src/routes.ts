import express from "express";
import { User } from "./entity/User";
import { AppDataSource } from "./data-source";

const router = express.Router();

router.get("/", async (req, res, next) => {
	console.log("Inserting a new user into the database...");
	const user = new User();
	user.firstName = "Timber";
	user.lastName = "Saw";
	user.age = 25;
	await AppDataSource.manager.save(user);
	console.log("Saved a new user with id: " + user.id);

	console.log("Loading users from the database...");
	const users = await AppDataSource.manager.find(User);

	console.log("Loaded users: ", users);

	res.send({
		api: "twello Main API",
		message: "Hello!",
	});
});

export default router;
