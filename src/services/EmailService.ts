import { IEmailService } from "../interfaces/IEmailService";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export class EmailService implements IEmailService {
	constructor() {}

	async sendRecoverOrChangePasswordEmail(
		userToken: string,
		userEmail: string
	): Promise<void> {
		const msg = {
			to: userEmail,
			from: "twello.inkwo@gmail.com",
			subject: "Password change request",
			text: `You have requested a password change. Access this link to change your token: localhost:3000/change-password?token=${userToken}`,
		};
		await sgMail
			.send(msg)
			.then(() => {
				console.log("Email sent");
			})
			.catch((error: unknown) => {
				console.error(error);
			});
	}
}
