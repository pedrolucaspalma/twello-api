export class StatusError extends Error {
	status: number;

	constructor(status: number, msg: string) {
		super(msg);
		this.status = status;
	}
}

export type StatusErrorType = {
	status: number;
	message: string;
};
