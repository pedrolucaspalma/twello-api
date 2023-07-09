import { Entity, Column } from "typeorm";
import {
	BaseContent,
	BaseContentType,
	DefaultPrivateFields,
} from "./BaseContent";

@Entity("SharedBoards")
export class SharedBoard extends BaseContent {
	@Column()
	userId: string;

	@Column()
	boardId: string;

	@Column()
	canEdit: boolean;

	@Column()
	isFavorite: boolean;
}

export type SharedBoardType = BaseContentType & {
	userId: string;
	boardId: string;
	canEdit: boolean;
	isFavorite: boolean;
};

type privateSharedBoardFields = "uuid" | DefaultPrivateFields;
export type PublicUserFields = Omit<SharedBoardType, privateSharedBoardFields>;
