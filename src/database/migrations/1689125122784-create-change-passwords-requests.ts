export class CreateChangePasswordsRequests1689125122784 {
	public async up(queryRunner): Promise<void> {
		const query = `CREATE TABLE "ChangePasswordRequests" (
                "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                "userId" UUID NOT NULL,
                "passwordToken" VARCHAR(255) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
                CONSTRAINT fk_userId_ChangePasswordRequests
                    FOREIGN KEY("userId")
                        REFERENCES "Users"("id")
            )`
	}

	public async down(queryRunner): Promise<void> {
		const query = `DROP TABLE "ChangePasswordRequests"`;
	}
}
