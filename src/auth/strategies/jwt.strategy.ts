import { Strategy as JwtStrategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PayloadToken } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';
import { PassportUse } from '../utils/passport.use';

export class JwtPassportStrategy extends AuthService {
	constructor() {
		super();
	}

	async validate(payload: PayloadToken, done: any) {
		return done(null, payload);
	}

	get use() {
		return PassportUse<
			JwtStrategy,
			StrategyOptions,
			(payload: PayloadToken, done: any) => Promise<PayloadToken>
		>(
			'jwt',
			JwtStrategy,
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				secretOrKey: this.getEnvironment('JWT_SECRET'),
			},
			this.validate
		);
	}
}
