import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import {
	BaseContent,
	BaseContentType,
	DefaultPrivateFields,
} from "./BaseContent";

import { User, UserType } from "./User";
@Entity("Board")
export class Board extends BaseContent {
	@Column()
	title: string;

	@Column()
	ownerUserId: string;

	@Column()
	backgroundColor: string;

	@Column()
	textColor: string;

	@ManyToOne(() => User, (user) => user.boards)
	@JoinColumn({ name: "ownerUserId" })
	user: User;
}

export type BoardType = BaseContentType & {
	ownerUserId: string;
	title: string;
	backgroundColor: string;
	textColor: string;
	owner?: UserType;
};

type privateBoardFields = "password" | DefaultPrivateFields;
export type PublicBoardFields = Omit<BoardType, privateBoardFields>;
