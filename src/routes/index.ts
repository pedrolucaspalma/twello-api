import express from "express";
import userRoutes from "./user";
import boardRoutes from "./boards";

const router = express.Router();

router.get("/api", async (req, res, next) => {
	res.send({
		api: "twello Main API",
		message: "Hello!",
	});
});

router.use("/user", userRoutes);
router.use("/boards", boardRoutes);

export default router;
