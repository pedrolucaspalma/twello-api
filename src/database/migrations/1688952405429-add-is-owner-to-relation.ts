import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsOwnerToRelation1688952405429 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "UserBoards" ADD COLUMN "isOwner" boolean NOT NULL DEFAULT false`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		`ALTER TABLE "UserBoards" DROP COLUMN "isOwner"`;
	}
}
