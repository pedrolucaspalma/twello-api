export interface ICryptUtil {
	hashPassword(password: string): Promise<string>;
	comparePasswords(
		payloadPassword: string,
		userPassword: string
	): Promise<boolean>;
	generateJWT(userData: { id: string; name: string; email: string }): string;
	generatePasswordToken(userId: string): string;
	verifyPasswordToken(token: string): { userId: string; passwordToken: string };
	getJWTExpireTime(env: string): number;
}
