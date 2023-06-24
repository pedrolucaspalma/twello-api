import express from "express";
import userRoutes from "./user";

const router = express.Router();

router.get("/api", async (req, res, next) => {
	res.send({
		api: "twello Main API",
		message: "Hello!",
	});
});

router.use("/user", userRoutes);

export default router;
