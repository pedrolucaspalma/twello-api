import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entity/User";
import { CreateUsers1688898771113 } from "./migrations/1688898771113-CreateUsers";

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
	entities: [User], // "src/entities/**/*.ts"
	migrations: [CreateUsers1688898771113], // "src/database/migrations/**/*.ts"
	subscribers: [], //"src/subscribers/**/*.ts"
	// cli: {
	// 	entitiesDir: "src/entities",
	// 	migrationsDir: "src/database/migrations",
	// 	subscribersDir: "src/subscribers",
	// },
});
