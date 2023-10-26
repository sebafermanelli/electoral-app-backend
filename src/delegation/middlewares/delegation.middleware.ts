import { validate } from 'class-validator';
import { SharedMiddleware } from '../../shared/middleware/shared.middleware';
import { DelegationDTO } from '../dtos/delegation.dto';
import { NextFunction, Request, Response } from 'express';

export class DelegationMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	validateDelegation(req: Request, res: Response, next: NextFunction) {
		const { election } = req.body;
		const valid = new DelegationDTO();
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
