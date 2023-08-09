export class AddContentColumn1688961241164 {
	public async up(queryRunner): Promise<void> {
		const query = `ALTER TABLE "Boards" ADD COLUMN "content" JSON NOT NULL DEFAULT '{"columns":[]}'`
	}

	public async down(queryRunner): Promise<void> {
		const query = `ALTER TABLE "Boards" DROP COLUMN "content"`
	}
}
