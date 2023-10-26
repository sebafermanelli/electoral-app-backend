import { validate } from 'class-validator';
import { SharedMiddleware } from '../../shared/middleware/shared.middleware';
import { NextFunction, Request, Response } from 'express';
import { ListDTO } from '../dtos/list.dto';

export class ListMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	validateList(req: Request, res: Response, next: NextFunction) {
		const { name, election } = req.body;
		const valid = new ListDTO();
		valid.name = name;
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
