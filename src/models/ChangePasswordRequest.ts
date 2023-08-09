export class ChangePasswordRequest {
	id: string;

	userId: string;

	passwordToken: string;

	createdAt: string;
}

export type ChangePasswordRequestsType = {
	uuid: string;
	userId: string;
	passwordToken: string;
	createdAt: string;
};
