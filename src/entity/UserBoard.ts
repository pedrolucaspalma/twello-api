import {
	BaseContent,
	BaseContentType,
	DefaultPrivateFields,
} from "./BaseContent";

export class UserBoard extends BaseContent {
	userId: string;

	boardId: string;

	isOwner: boolean;

	canEdit: boolean;

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
