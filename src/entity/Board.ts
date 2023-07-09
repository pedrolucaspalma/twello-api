import { Entity, Column, ManyToOne } from "typeorm";
import {
	BaseContent,
	BaseContentType,
	DefaultPrivateFields,
} from "./BaseContent";
import { User, UserType } from "./User";

@Entity("Users")
export class Board extends BaseContent {
	@Column()
	ownedUserId: string;

	@Column()
	title: string;

	@Column()
	backgroundColor: string;

	@Column()
	textColor: string;

	@ManyToOne(() => User, (user) => user.boards)
	user: User;
}

export type BoardType = BaseContentType & {
	ownedUserId: string;
	title: string;
	backgroundColor: string;
	textColor: string;
	owner?: UserType;
};

type privateBoardFields = "password" | DefaultPrivateFields;
export type PublicBoardFields = Omit<BoardType, privateBoardFields>;
