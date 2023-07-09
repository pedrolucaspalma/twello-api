import { Entity, Column } from "typeorm";
import { BaseContent } from "./BaseContent";

@Entity("Users")
export class User extends BaseContent {
	@Column()
	name: string;

	@Column()
	password: string;

	@Column()
	email: string;
}

export type UserType = {
	id: string;
	name: string;
	password: string;
	email: string;
	createdAt: string;
	updatedAt: string;
};
