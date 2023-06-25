import { Board } from "./BoardTypes";

export type CreateUserPayload = {
	name: string;
	email: string;
	password: string;
};

export type SignInPayload = {
	email: string;
	password: string;
};

export type DecodedTokenUserPayload = {
	id: string;
	name: string;
	email: string;
};

export type User = {
	id: string;
	name: string;
	password: string;
	email: string;
	createdAt: number;
};

export type UserBoardsList = {
	owned: Board[];
	shared: Board[];
};
