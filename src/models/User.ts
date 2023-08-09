import {
	BaseContent,
	BaseContentType,
	DefaultPrivateFields,
} from "./BaseContent";

export class User extends BaseContent {
	name: string;

	password: string;

	email: string;
}

export type UserType = BaseContentType & {
	name: string;
	password: string;
	email: string;
};

type privateUserFields = "password" | DefaultPrivateFields;
export type PublicUserFields = Omit<UserType, privateUserFields>;
