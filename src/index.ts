import "reflect-metadata";

import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

import router from "./routes";

import { AppDataSource } from "./data-source";

AppDataSource.initialize()
	.then(async () => {
		dotenv.config();
		const app = express();
		const port = process.env.PORT;

		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(bodyParser.json());

		app.use(router);

		app.listen(port, () => {
			console.log(`[server]: Server is running at http://localhost:${port}`);
		});
	})
	.catch((error) => console.log(error));
