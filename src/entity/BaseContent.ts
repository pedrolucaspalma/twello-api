import {
	BaseEntity,
	CreateDateColumn,
	PrimaryColumn,
	UpdateDateColumn,
} from "typeorm";

export abstract class BaseContent extends BaseEntity {
	@PrimaryColumn("uuid")
	id: string;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;
}
