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
	uuid: string;
	name: string;
	email: string;
};

export type User = {
	uuid: string;
	name: string;
	password: string;
	email: string;
	createdAt: number;
};
