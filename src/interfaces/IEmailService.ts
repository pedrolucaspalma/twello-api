export interface IEmailService {
	sendRecoverOrChangePasswordEmail(
		userToken: string,
		userEmail: string
	): Promise<void>;
}
