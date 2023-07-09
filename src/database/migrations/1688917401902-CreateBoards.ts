import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBoards1688917401902 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "Boards" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "ownerUserId" UUID NOT NULL,
                "title" VARCHAR(50) NOT NULL,
                "backgroundColor" VARCHAR(50) NOT NULL,
                "textColor" VARCHAR(50) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
				"updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
                CONSTRAINT fk_ownerUserId_Boards
                    FOREIGN KEY("ownerUserId")
                        REFERENCES "Users"("id")
            )`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "Boards"`);
	}
}
