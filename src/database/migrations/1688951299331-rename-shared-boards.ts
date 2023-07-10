import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameSharedBoards1688951299331 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "SharedBoards" RENAME TO "UserBoards"`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "UserBoards" RENAME TO "SharedBoards"`
		);
	}
}
