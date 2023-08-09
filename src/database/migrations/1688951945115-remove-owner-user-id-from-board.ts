export class RemoveOwnerUserIdFromBoard1688951945115 {
	public async up(queryRunner): Promise<void> {
		const query = `ALTER TABLE "Boards" DROP COLUMN "ownerUserId"`
	}

	public async down(queryRunner): Promise<void> {
		const query = `ALTER TABLE "Boards" ADD COLUMN "ownerUserId" UUID NOT NULL`

		const q2 = `ALTER TABLE "Boards" ADD CONSTRAINT "FK_Boards_ownerUserId" FOREIGN KEY ("ownerUserId") REFERENCES "Users"("id")`
	}
}
