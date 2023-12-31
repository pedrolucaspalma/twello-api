import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSharedBoards1688943192102 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "SharedBoards" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "userId" UUID NOT NULL,
                "boardId" UUID NOT NULL,
                "canEdit" BOOLEAN NOT NULL,
                "isFavorite" BOOLEAN NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
				"updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),

                CONSTRAINT fk_userId_SharedBoards
                    FOREIGN KEY("userId")
                        REFERENCES "Users"("id"),

                CONSTRAINT fk_boardId_SharedBoards
                    FOREIGN KEY("boardId")
                        REFERENCES "Boards"("id")
            )`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "SharedBoards"`);
	}
}
