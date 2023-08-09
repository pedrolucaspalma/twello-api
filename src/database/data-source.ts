import "reflect-metadata";
import { User } from "../models/User";
import { Board } from "../models/Board";
import { UserBoard } from "../models/UserBoard";
import { ChangePasswordRequest } from "../models/ChangePasswordRequest";

const {
	DATABASE_HOST,
	DATABASE_SCHEMA,
	DATABASE_INTERNAL_PORT,
	DATABASE_USERNAME,
	DATABASE_PASSWORD,
} = process.env;

const port = Number(DATABASE_INTERNAL_PORT);

export const AppDataSource = {}
