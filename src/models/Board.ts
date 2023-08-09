import {
	BaseContent,
	BaseContentType,
	DefaultPrivateFields,
} from "./BaseContent";
export class Board extends BaseContent {
	title: string;

	backgroundColor: string;

	textColor: string;

	content: JSON;
}

export type BoardType = BaseContentType & {
	title: string;
	backgroundColor: string;
	textColor: string;
};

type privateBoardFields = "password" | DefaultPrivateFields;
export type PublicBoardFields = Omit<BoardType, privateBoardFields>;
