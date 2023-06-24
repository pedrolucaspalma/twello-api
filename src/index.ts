import "reflect-metadata";

import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";

import router from "./routes";

import { StatusError, StatusErrorType } from "./utils/StatusErrors";

dotenv.config();
const app = express();
const port = process.env.PORT;

// Adding body-parser to be able to access req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Adding app routes
app.use(router);

// Adding middlewares to be called after every route.
// 404 error middleware
app.use((req: Request, res: Response, next: NextFunction) =>
	next(new StatusError(404, "Route not found"))
);
// Global Error handler middleware
app.use(
	(err: StatusErrorType, req: Request, res: Response, next: NextFunction) => {
		console.log(`[error]: ${err.message}`);
		if (err.message && err.status)
			return res.status(err.status).send({ message: err.message });

		return res.status(500).send({ message: "Internal server Error" });
	}
);

// Initializing server
app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
