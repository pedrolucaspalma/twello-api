import { IUserDao } from "../interfaces/IUserDao";
import { IUserService } from "../interfaces/IUserService";
import { CreateUserPayload, SignInPayload } from "../types/UserTypes";
import { CryptUtil } from "../utils/CryptUtil";
import { StatusError } from "../utils/StatusErrors";

export class UserService implements IUserService {
	constructor(private readonly userDao: IUserDao) {}
	async createUser(userData: CreateUserPayload): Promise<void> {
		const emailIsAvailable = await this.userDao.isEmailAvailable(
			userData.email
		);
		if (!emailIsAvailable) throw new StatusError(400, "email already in use");

		const encryptedPassword = await CryptUtil.hashPassword(userData.password);
		const formattedData = { ...userData, password: encryptedPassword };
		await this.userDao.create(formattedData);
	}

	async signIn(signInData: SignInPayload): Promise<string> {
		const user = await this.userDao.findByEmail(signInData.email);
		if (!user) throw new StatusError(401, "Invalid credentials");

		const passwordMatches = await CryptUtil.comparePasswords(
			signInData.password,
			user.password
		);
		if (!passwordMatches) throw new StatusError(401, "Invalid credentials");

		const token = CryptUtil.generateJWT({
			uuid: user.uuid,
			email: user.email,
			name: user.name,
		});

		return token;
	}
}
