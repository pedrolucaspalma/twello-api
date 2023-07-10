import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import {
	BaseContent,
	BaseContentType,
	DefaultPrivateFields,
} from "./BaseContent";

import { User, UserType } from "./User";
@Entity("Boards")
export class Board extends BaseContent {
	@Column()
	title: string;

	@Column()
	backgroundColor: string;

	@Column()
	textColor: string;
}

export type BoardType = BaseContentType & {
	title: string;
	backgroundColor: string;
	textColor: string;
};

type privateBoardFields = "password" | DefaultPrivateFields;
export type PublicBoardFields = Omit<BoardType, privateBoardFields>;
