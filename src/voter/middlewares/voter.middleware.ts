import { validate } from 'class-validator';
import { SharedMiddleware } from '../../shared/middleware/shared.middleware';
import { NextFunction, Request, Response } from 'express';
import { VoterDTO } from '../dtos/voter.dto';

export class VoterMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	validateVoter(req: Request, res: Response, next: NextFunction) {
		const { user } = req.body;
		const valid = new VoterDTO();
		valid.user = user;
		validate(valid).then((error) => {
			if (error.length > 0) {
				return this.httpResponse.Error(res, error);
			} else {
				next();
			}
		});
	}
}
