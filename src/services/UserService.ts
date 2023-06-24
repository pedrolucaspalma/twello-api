import { IUserDao } from "../interfaces/IUserDao";
import { IUserService } from "../interfaces/IUserService";
import { CreateUserPayload, SignInPayload } from "../types/UserTypes";
import { CryptUtil } from "../utils/CryptUtil";

export class UserService implements IUserService {
	constructor(private readonly userDao: IUserDao) {}
	async createUser(userData: CreateUserPayload): Promise<void> {
		const emailIsAvailable = await this.userDao.isEmailAvailable(
			userData.email
		);
		if (!emailIsAvailable) throw new Error("email already in use");

		const encryptedPassword = await CryptUtil.hashPassword(userData.password);
		const formattedData = { ...userData, password: encryptedPassword };
		await this.userDao.create(formattedData);
	}

	async signIn(signInData: SignInPayload): Promise<string> {
		const user = await this.userDao.findByEmail(signInData.email);
		if (!user) throw new Error("Invalid credentials");

		const passwordMatches = await CryptUtil.comparePasswords(
			signInData.password,
			user.password
		);
		if (!passwordMatches) throw new Error("Invalid credentials");

		const token = CryptUtil.generateJWT({
			uuid: user.uuid,
			email: user.email,
			name: user.name,
		});

		return token;
	}
}
