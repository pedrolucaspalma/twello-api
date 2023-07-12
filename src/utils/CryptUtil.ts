import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { ICryptUtil } from "../interfaces/ICryptUtil";
const { SECRET, ENVIRONMENT } = process.env;

export class CryptUtil implements ICryptUtil {
	async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	}

	async comparePasswords(
		payloadPassword: string,
		userPassword: string
	): Promise<boolean> {
		return bcrypt.compare(payloadPassword, userPassword);
	}

	generatePasswordToken(userId: string): string {
		const passwordToken = String(Math.random());

		const token = jsonwebtoken.sign(
			{ userId, passwordToken },
			SECRET as string,
			{
				expiresIn: this.getJWTExpireTime(ENVIRONMENT as string),
			}
		);
		return token;
	}

	verifyPasswordToken(token: string): {
		userId: string;
		passwordToken: string;
	} {
		const decoded = jsonwebtoken.verify(token, SECRET as string);
		return decoded as { userId: string; passwordToken: string };
	}

	generateJWT(userData: { id: string; name: string; email: string }): string {
		const token = jsonwebtoken.sign(userData, SECRET as string, {
			expiresIn: this.getJWTExpireTime(ENVIRONMENT as string),
		});
		return token;
	}

	getJWTExpireTime(env: string): number {
		if (env === "development") return 86400;
		if (env === "production") return 3600;
		return 3600;
	}
}
