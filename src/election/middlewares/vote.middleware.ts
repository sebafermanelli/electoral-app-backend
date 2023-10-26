import { validate } from 'class-validator';
import { SharedMiddleware } from '../../shared/middleware/shared.middleware';
import { NextFunction, Request, Response } from 'express';
import { VoteDTO } from '../dtos/vote.dto';

export class VoteMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	validateVote(req: Request, res: Response, next: NextFunction) {
		const { voter, election } = req.body;
		const valid = new VoteDTO();
		valid.voter = voter;
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
