import { UserType } from "../entity/User";
import { SharedBoardType } from "../entity/UserBoard";
import { IBoardDao } from "../interfaces/IBoardDao";
import { ICryptUtil } from "../interfaces/ICryptUtil";
import { IEmailService } from "../interfaces/IEmailService";
import { IUserDao } from "../interfaces/IUserDao";
import {
	IUserService,
	CreateUserReturn,
	ShareBoardParams,
} from "../interfaces/IUserService";
import {
	CreateUserPayload,
	SignInPayload,
	UserBoardsList,
} from "../types/UserTypes";
import { StatusError } from "../utils/StatusErrors";

export class UserService implements IUserService {
	constructor(
		private readonly cryptUtil: ICryptUtil,
		private readonly emailService: IEmailService,
		private readonly userDao: IUserDao,
		private readonly boardDao: IBoardDao
	) {}
	async createUser(userData: CreateUserPayload): Promise<CreateUserReturn> {
		if (userData.password.length < 8) {
			throw new StatusError(
				400,
				"Passwords must be composed of least 8 characters"
			);
		}

		const emailIsAvailable = await this.userDao.isEmailAvailable(
			userData.email
		);
		if (!emailIsAvailable) throw new StatusError(400, "email already in use");

		const encryptedPassword = await this.cryptUtil.hashPassword(
			userData.password
		);
		const formattedData = { ...userData, password: encryptedPassword };
		const user = await this.userDao.create(formattedData);

		if (!user) return { user, token: null };

		const token = this.cryptUtil.generateJWT({
			id: user.id,
			email: user.email,
			name: user.name,
		});
		return { user, token };
	}

	async signIn(signInData: SignInPayload): Promise<CreateUserReturn> {
		const user = await this.userDao.findByEmail(signInData.email);
		if (!user) throw new StatusError(401, "Invalid credentials");

		const passwordMatches = await this.cryptUtil.comparePasswords(
			signInData.password,
			user.password
		);
		if (!passwordMatches) throw new StatusError(401, "Invalid credentials");

		const token = this.cryptUtil.generateJWT({
			id: user.id,
			email: user.email,
			name: user.name,
		});

		const values: CreateUserReturn = {
			user,
			token,
		};

		return values;
	}

	async handleChangePasswordRequest(userEmail: string): Promise<void> {
		const user = await this.userDao.findByEmail(userEmail);
		if (!user) throw new StatusError(404, "User not found");
		const token = this.cryptUtil.generatePasswordToken(user.id);
		await this.userDao.setPasswordToken(user.id, token);
		await this.emailService.sendRecoverOrChangePasswordEmail(token, user.email);
	}

	async changePassword(token: string, password: string): Promise<UserType> {
		let decodedTokenContent;
		try {
			const decoded = this.cryptUtil.verifyPasswordToken(token);
			decodedTokenContent = decoded;
		} catch (e) {
			throw new StatusError(400, "Invalid or expired token.");
		}

		const user = await this.userDao.findById(decodedTokenContent.userId);
		if (!user) throw new StatusError(404, "User not found");

		const encodedPassword = await this.cryptUtil.hashPassword(password);
		return this.userDao.updatePassword(
			decodedTokenContent.userId,
			encodedPassword
		);
	}

	async listBoards(userId: string): Promise<UserBoardsList> {
		const [owned, shared] = await Promise.all([
			this.boardDao.getBoardsOwnedByUser(userId),
			this.boardDao.getBoardsSharedWithUser(userId),
		]);
		const response: UserBoardsList = {
			owned,
			shared,
		};
		return response;
	}

	async shareBoardWithUser(
		params: ShareBoardParams,
		requestingUserId: string
	): Promise<SharedBoardType | null> {
		const board = await this.boardDao.getBoard(params.boardId);
		if (!board) throw new StatusError(404, "Board not found");

		const requestingUserAssociation =
			await this.boardDao.getUserAssociationWithBoard(
				board.id,
				requestingUserId
			);
		if (!requestingUserAssociation || !requestingUserAssociation?.isOwner)
			throw new StatusError(403, "You are not the owner of this board");

		const user = await this.userDao.findByEmail(params.userEmail);
		if (!user) throw new StatusError(404, "User not found");

		const isBoardAlreadyShared =
			await this.boardDao.getUserAssociationWithBoard(params.boardId, user.id);

		if (isBoardAlreadyShared)
			throw new StatusError(400, "Board already shared with this user");

		const association = await this.boardDao.createRelationBetweenUserAndBoard({
			boardId: params.boardId,
			canEdit: params.canEdit,
			userId: user.id,
		});

		return association;
	}

	async deleteUserBoardAssociation(
		relationId: string,
		requestingUserId: string
	): Promise<boolean> {
		const association = await this.boardDao.getRelationById(relationId);
		if (!association) throw new StatusError(404, "Association not found");
		if (association.isOwner)
			throw new StatusError(403, "You cannot perform this action");

		const requestingUserAssociation =
			await this.boardDao.getUserAssociationWithBoard(
				association.boardId,
				requestingUserId
			);

		// Only the owner of the board or the user in question can delete associations
		if (
			!requestingUserAssociation?.isOwner &&
			requestingUserId !== association.userId
		) {
			throw new StatusError(403, "You cannot perform this action");
		}

		const deleted = await this.boardDao.deleteRelationBetweenUserAndBoard(
			association.id
		);

		return !!deleted;
	}
}
