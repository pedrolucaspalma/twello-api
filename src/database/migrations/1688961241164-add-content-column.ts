import { MigrationInterface, QueryRunner } from "typeorm";

export class AddContentColumn1688961241164 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "Boards" ADD COLUMN "content" JSON NOT NULL DEFAULT '{"columns":[]}'`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "Boards" DROP COLUMN "content"`);
	}
}
