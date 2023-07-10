import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveOwnerUserIdFromBoard1688951945115
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "Boards" DROP COLUMN "ownerUserId"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "Boards" ADD COLUMN "ownerUserId" UUID NOT NULL`
		);
		await queryRunner.query(
			`ALTER TABLE "Boards" ADD CONSTRAINT "FK_Boards_ownerUserId" FOREIGN KEY ("ownerUserId") REFERENCES "Users"("id")`
		);
	}
}
