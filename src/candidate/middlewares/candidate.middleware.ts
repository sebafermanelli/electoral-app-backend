import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { SharedMiddleware } from '../../shared/middleware/shared.middleware';
import { CandidateDTO } from '../dtos/candidate.dto';

export class CandidateMiddleware extends SharedMiddleware {
	constructor() {
		super();
	}

	validateCandidate(req: Request, res: Response, next: NextFunction) {
		const { voter, role, list, delegation } = req.body;
		const valid = new CandidateDTO();
		valid.voter = voter;
		valid.role = role;
		valid.list = list;
		valid.delegation = delegation;
		validate(valid).then((error) => {
			if (error.length > 0) {
				return this.httpResponse.Error(res, error);
			} else {
				next();
			}
		});
	}
}
