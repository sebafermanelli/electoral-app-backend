import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { SharedMiddleware } from '../../shared/middleware/shared.middleware';
import { UserDTO } from '../dtos/user.dto';

export class UserMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	validateUser(req: Request, res: Response, next: NextFunction) {
		const { username, email, password, name, lastname, role } = req.body;
		const valid = new UserDTO();
		valid.username = username;
		valid.email = email;
		valid.password = password;
		valid.name = name;
		valid.lastname = lastname;
		valid.role = role;
		validate(valid).then((error) => {
			if (error.length > 0) {
				return this.httpResponse.Error(res, error);
			} else {
				next();
			}
		});
	}
}
