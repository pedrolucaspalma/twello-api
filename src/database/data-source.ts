import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Board } from "../entity/Board";
import { UserBoard } from "../entity/UserBoard";
import { ChangePasswordRequest } from "../entity/ChangePasswordRequest";

const {
	DATABASE_HOST,
	DATABASE_SCHEMA,
	DATABASE_INTERNAL_PORT,
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
} = process.env;

const port = Number(DATABASE_INTERNAL_PORT);

export const AppDataSource = new DataSource({
	type: "postgres",
	host: DATABASE_HOST,
	port,
	username: DATABASE_USERNAME,
	password: DATABASE_PASSWORD,
	database: DATABASE_SCHEMA,
	synchronize: false,
	logging: false,
	entities: [User, Board, UserBoard, ChangePasswordRequest],
	migrations: ["build/database/migrations/**/*.js"],
	subscribers: [],
});
