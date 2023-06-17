import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
	res.send({
		api: "twello Main API",
		message: "Hello!",
	});
});

export default router;
