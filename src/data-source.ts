import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { CreateUsersTable1687484006792 } from "./migration/1687484006792-CreateUsersTable";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "twello-db",
	port: 5432,
	username: "postgres",
	password: "postgres",
	database: "twello-db",
	synchronize: false,
	logging: false,
	entities: [User],
	migrations: [CreateUsersTable1687484006792],
	migrationsRun: true,
	migrationsTableName: "TypeOrmMeta",
	subscribers: [],
});
