import "reflect-metadata";
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

export const AppDataSource = {}
