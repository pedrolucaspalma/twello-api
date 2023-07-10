import { Entity, Column } from "typeorm";
import {
	BaseContent,
	BaseContentType,
	DefaultPrivateFields,
} from "./BaseContent";

@Entity("UserBoards")
export class UserBoard extends BaseContent {
	@Column()
	userId: string;

	@Column()
	isOwner: boolean;

	@Column()
	boardId: string;

	@Column()
	canEdit: boolean;

	@Column()
	isFavorite: boolean;
}

export type SharedBoardType = BaseContentType & {
	userId: string;
	isOwner: boolean;
	boardId: string;
	canEdit: boolean;
	isFavorite: boolean;
};

type privateSharedBoardFields = "uuid" | DefaultPrivateFields;
export type PublicUserFields = Omit<SharedBoardType, privateSharedBoardFields>;
