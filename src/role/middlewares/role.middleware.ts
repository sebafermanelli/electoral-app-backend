import { validate } from 'class-validator';
import { SharedMiddleware } from '../../shared/middleware/shared.middleware';
import { NextFunction, Request, Response } from 'express';
import { RoleDTO } from '../dtos/role.dto';

export class RoleMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	validateRole(req: Request, res: Response, next: NextFunction) {
		const { name, order, election } = req.body;
		const valid = new RoleDTO();
		valid.name = name;
		valid.order = order;
		valid.election = election;
		validate(valid).then((error) => {
			if (error.length > 0) {
				return this.httpResponse.Error(res, error);
			} else {
				next();
			}
		});
	}
}
