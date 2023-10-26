import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { ConfigServer } from '../../config/config';
import { PayloadToken } from '../interfaces/auth.interface';
import { UserService } from '../../user/services/user.service';
import { UserEntity } from '../../user/entities/user.entity';

export class AuthService extends ConfigServer {
	constructor(
		private readonly userService: UserService = new UserService(),
		private readonly jwtInstance = jwt
	) {
		super();
	}

	async validateAuth(username: string, password: string): Promise<UserEntity | null> {
		const userByUsername = await this.userService.findUserByUsername(username);
		const userByEmail = await this.userService.findUserByEmail(username);
		if (userByUsername) {
			const isMatch = await bcrypt.compare(password, userByUsername.password);
			if (isMatch) {
				return userByUsername;
			}
		}
		if (userByEmail) {
			const isMatch = await bcrypt.compare(password, userByEmail.password);
			if (isMatch) {
				return userByEmail;
			}
		}
		return null;
	}

	sign(payload: jwt.JwtPayload, secret: any) {
		return this.jwtInstance.sign(payload, secret);
	}

	async generateJWT(user: UserEntity): Promise<{ accessToken: string; user: UserEntity }> {
		const userConsult = await this.userService.findUserByIdAndRole(user.id, user.role);
		const payload: PayloadToken = {
			role: userConsult!.role,
			sub: userConsult!.id,
		};
		if (userConsult) {
			user.password = 'Not permission';
		}
		return {
			accessToken: this.sign(payload, this.getEnvironment('JWT_SECRET')),
			user,
		};
	}
}
