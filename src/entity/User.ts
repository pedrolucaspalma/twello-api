import { Entity, Column } from "typeorm";
import {
	BaseContent,
	BaseContentType,
	DefaultPrivateFields,
} from "./BaseContent";

@Entity("Users")
export class User extends BaseContent {
	@Column()
	name: string;

	@Column()
	password: string;

	@Column()
	email: string;
}

export type UserType = BaseContentType & {
	name: string;
	password: string;
	email: string;
};

type privateUserFields = "password" | DefaultPrivateFields;
export type PublicUserFields = Omit<UserType, privateUserFields>;
