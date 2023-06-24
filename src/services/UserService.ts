import { IUserDao } from "../interfaces/IUserDao";
import { IUserInterface } from "../interfaces/IUserService";
import { CreateUserPayload } from "../types/UserTypes";

export class UserService implements IUserInterface {
	constructor(private readonly userDao: IUserDao) {}
	async createUser(userData: CreateUserPayload): Promise<void> {
		const isEmailAvailable = await this.userDao.checkEmailAvailability(
			userData.email
		);
		if (!isEmailAvailable) throw new Error("e-mail already in use");

		const encryptedPassword = this.hashPassword(userData.password);
		const formattedData = { ...userData, password: encryptedPassword };
		await this.userDao.create(formattedData);
	}

	private hashPassword(password: string): string {
		throw new Error("não implementado");
		return password;
	}
}
