import { Entity, Column } from "typeorm";
import {
	BaseContent,
	BaseContentType,
	DefaultPrivateFields,
} from "./BaseContent";
@Entity("Boards")
export class Board extends BaseContent {
	@Column()
	title: string;

	@Column()
	backgroundColor: string;

	@Column()
	textColor: string;

	@Column("json")
	content: JSON;
}

export type BoardType = BaseContentType & {
	title: string;
	backgroundColor: string;
	textColor: string;
};

type privateBoardFields = "password" | DefaultPrivateFields;
export type PublicBoardFields = Omit<BoardType, privateBoardFields>;
