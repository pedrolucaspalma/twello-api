import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateChangePasswordsRequests1689125122784
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "ChangePasswordRequests" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "userId" UUID NOT NULL,
                "passwordToken" VARCHAR(255) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
                CONSTRAINT fk_userId_ChangePasswordRequests
                    FOREIGN KEY("userId")
                        REFERENCES "Users"("id")
            )`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE "ChangePasswordRequests"`);
	}
}
