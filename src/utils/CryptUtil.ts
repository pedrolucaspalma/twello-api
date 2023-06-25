import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
const { SECRET } = process.env;

export class CryptUtil {
	static async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	}

	static async comparePasswords(
		payloadPassword: string,
		userPassword: string
	): Promise<boolean> {
		return bcrypt.compare(payloadPassword, userPassword);
	}
	static generateJWT(userData: {
		id: string;
		name: string;
		email: string;
	}): string {
		const token = jsonwebtoken.sign(userData, SECRET as string, {
			expiresIn: 600,
		});
		return token;
	}
}
