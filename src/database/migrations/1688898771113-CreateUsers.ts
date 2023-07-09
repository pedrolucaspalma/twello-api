import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1688898771113 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE Users (
                id UUID PRIMARY KEY,
                name VARCHAR(50) NOT NULL,
                password VARCHAR(50) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                createdAt TIMESTAMP NOT NULL
            )`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE Users`);
	}
}
