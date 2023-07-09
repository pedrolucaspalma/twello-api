import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column()
	password: string;

	@Column()
	email: string;

	@Column({ default: new Date().getMilliseconds() })
	createdAt: number;
}
