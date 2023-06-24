import express from "express";
import userRoutes from "./user";

const router = express.Router();

router.get("/", async (req, res, next) => {
	res.send({
		api: "twello Main API",
		message: "Hello!",
	});
});

router.use("/users", userRoutes);

export default router;
