export type CreateUserPayload = {
	name: string;
	email: string;
	password: string;
};

export type User = {
	name: string;
	password: string;
	email: string;
	createdAt: number;
};
