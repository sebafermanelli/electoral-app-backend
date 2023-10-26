import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { PassportUse } from '../utils/passport.use';
import { UserEntity } from '../../user/entities/user.entity';

const authService: AuthService = new AuthService();

export class LoginPassportStrategy {
	async validateAuth(username: string, password: string, done: any): Promise<UserEntity> {
		const user = await authService.validateAuth(username, password);
		if (!user) {
			return done(null, false, { message: 'Usuario o contraseña incorrectos' });
		}
		return done(null, user);
	}

	get use() {
		return PassportUse<LocalStrategy, Object, VerifyFunction>(
			'login',
			LocalStrategy,
			{ usernameField: 'username', passwordField: 'password' },
			this.validateAuth
		);
	}
}
