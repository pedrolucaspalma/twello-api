import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1687484006792 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
            CREATE TABLE Users (
                id INT NOT NULL PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(50) NOT NULL,
                createdAt TIMESTAMP NOT NULL
            )
        `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
        DROP TABLE Users
    `);
	}
}
