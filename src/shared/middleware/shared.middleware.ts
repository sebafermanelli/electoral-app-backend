import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { HttpResponse } from '../response/http.response';
import { UserEntity } from '../../user/entities/user.entity';
import { RoleType } from '../../user/dtos/user.dto';

export class SharedMiddleware {
	constructor(public httpResponse: HttpResponse = new HttpResponse()) {}

	passAuth(strategy: string) {
		return passport.authenticate(strategy, { session: false });
	}

	async checkAdminRole(req: Request, res: Response, next: NextFunction) {
		const user = req.user as UserEntity;
		if (user.role !== RoleType.ADMIN) {
			return this.httpResponse.Unauthorized(res, 'No tienes permisos');
		}
		return next();
	}
}
