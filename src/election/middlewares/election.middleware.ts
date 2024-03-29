import { validate } from 'class-validator';
import { SharedMiddleware } from '../../shared/middleware/shared.middleware';
import { NextFunction, Request, Response } from 'express';
import { ElectionDTO } from '../dtos/election.dto';

export class ElectionMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	validateElection(req: Request, res: Response, next: NextFunction) {
		const { name, finalizated } = req.body;
		const valid = new ElectionDTO();
		valid.name = name;
		valid.finalizated = finalizated;
		validate(valid).then((error) => {
			if (error.length > 0) {
				return this.httpResponse.Error(res, error);
			} else {
				next();
			}
		});
	}
}
