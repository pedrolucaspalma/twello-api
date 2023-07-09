import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1688898771113 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "Users" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" VARCHAR(50) NOT NULL,
                "password" VARCHAR(255) NOT NULL,
                "email" VARCHAR(50) UNIQUE NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
				"updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
            )`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "Users"`);
	}
}
