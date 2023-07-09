import {
	BaseEntity,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

export abstract class BaseContent extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;
}

export type BaseContentType = {
	id: string;
	createdAt: string;
	updatedAt: string;
};

export type DefaultPrivateFields = "createdAt" | "updatedAt";
