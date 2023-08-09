export class RenameSharedBoards1688951299331 {
	public async up(queryRunner): Promise<void> {
		const query = `ALTER TABLE "SharedBoards" RENAME TO "UserBoards"`
	}

	public async down(queryRunner): Promise<void> {
		const query = `ALTER TABLE "UserBoards" RENAME TO "SharedBoards"`
	}
}
