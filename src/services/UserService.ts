import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import { IUserDao } from "../interfaces/IUserDao";
import { IUserService } from "../interfaces/IUserService";
import { CreateUserPayload, SignInPayload } from "../types/UserTypes";

const { SECRET } = process.env;

export class UserService implements IUserService {
	constructor(private readonly userDao: IUserDao) {}
	async createUser(userData: CreateUserPayload): Promise<void> {
		const emailIsAvailable = await this.userDao.isEmailAvailable(
			userData.email
		);
		if (!emailIsAvailable) throw new Error("email already in use");

		const encryptedPassword = await this.hashPassword(userData.password);
		const formattedData = { ...userData, password: encryptedPassword };
		await this.userDao.create(formattedData);
	}

	async signIn(signInData: SignInPayload): Promise<string> {
		const user = await this.userDao.findByEmail(signInData.email);
		if (!user) throw new Error("Invalid credentials");

		const passwordMatches = await this.comparePasswords(
			signInData.password,
			user.password
		);
		if (!passwordMatches) throw new Error("Invalid credentials");

		const token = this.generateJWT({
			uuid: user.uuid,
			email: user.email,
			name: user.name,
		});

		return token;
	}

	private async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	}

	private async comparePasswords(
		payloadPassword: string,
		userPassword: string
	): Promise<boolean> {
		return bcrypt.compare(payloadPassword, userPassword);
	}

	private generateJWT(userData: {
		uuid: string;
		name: string;
		email: string;
	}): string {
		const token = jsonwebtoken.sign(userData, SECRET as string);
		return token;
	}
}
