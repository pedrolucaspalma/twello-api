import { BoardType } from "../models/Board";

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

export type UserBoardsList = {
	owned: BoardType[];
	shared: BoardType[];
};
