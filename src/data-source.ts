import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "twello-db",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "twello-db",
	synchronize: true,
	logging: false,
	entities: [User],
	migrations: [],
	subscribers: [],
});
