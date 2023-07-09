import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { Board } from "../entity/Board";

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
	entities: [User, Board],
	migrations: ["build/database/migrations/**/*.js"],
	subscribers: [],
});
