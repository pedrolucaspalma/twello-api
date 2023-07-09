import { Entity, Column, OneToMany } from "typeorm";
import {
	BaseContent,
	BaseContentType,
	DefaultPrivateFields,
} from "./BaseContent";
import { Board, BoardType } from "./Board";

@Entity("Users")
export class User extends BaseContent {
	@Column()
	name: string;

	@Column()
	password: string;

	@Column()
	email: string;

	@OneToMany(() => Board, (board) => board.user)
	boards: Board[];
}

export type UserType = BaseContentType & {
	name: string;
	password: string;
	email: string;
	boards?: BoardType[];
};

type privateUserFields = "password" | DefaultPrivateFields;
export type PublicUserFields = Omit<UserType, privateUserFields>;
