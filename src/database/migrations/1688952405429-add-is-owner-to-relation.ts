export class AddIsOwnerToRelation1688952405429 {
	public async up(queryRunner): Promise<void> {
		const query = `ALTER TABLE "UserBoards" ADD COLUMN "isOwner" boolean NOT NULL DEFAULT false`
	}

	public async down(queryRunner): Promise<void> {
		const query = `ALTER TABLE "UserBoards" DROP COLUMN "isOwner"`;
	}
}
