import { IUserDao } from "../interfaces/IUserDao";
import { CreateUserPayload } from "../types/UserTypes";
import { usersTable } from "../database";
import { User, UserType } from "../entity/User";
import { AppDataSource } from "../database/data-source";

const usersRepository = AppDataSource.getRepository("User");

export class UserDao implements IUserDao {
	async isEmailAvailable(email: string): Promise<boolean> {
		const user = await usersRepository.findOne({ where: { email } });
		if (user) return false;
		return true;
	}

	async create(userCreationPayload: CreateUserPayload): Promise<UserType> {
		const user = new User();
		user.name = userCreationPayload.name;
		user.email = userCreationPayload.email;
		user.password = userCreationPayload.password;
		await user.save();
		return this.findById(user.id);
	}

	async findById(id: string): Promise<UserType> {
		const userLiteral: any = await usersRepository.findOne({
			where: { id },
		});

		return userLiteral as UserType;
	}

	async findByEmail(email: string): Promise<UserType | null> {
		const user = await usersRepository.findOne({ where: { email } });
		if (!user) return null;
		return user as UserType;
	}

	async listUsers(): Promise<UserType[]> {
		const users = await usersRepository.findBy({});
		return users as UserType[];
	}
}
