import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
} from "typeorm";

@Entity("ChangePasswordRequests")
export class ChangePasswordRequest extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	userId: string;

	@Column()
	passwordToken: string;

	@CreateDateColumn()
	createdAt: string;
}

export type ChangePasswordRequestsType = {
	uuid: string;
	userId: string;
	passwordToken: string;
	createdAt: string;
};
