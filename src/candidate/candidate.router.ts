import { SharedRouter } from '../shared/router/shared.router';
import { CandidateController } from './controllers/candidate.controller';
import { CandidateMiddleware } from './middlewares/candidate.middleware';

export class CandidateRouter extends SharedRouter<CandidateController, CandidateMiddleware> {
	constructor() {
		super(CandidateController, CandidateMiddleware);
	}

	routes(): void {
		this.router.get('/candidate', this.middleware.passAuth('jwt'), (req, res) =>
			this.controller.getAllCandidates(req, res)
		);

		this.router.get('/candidate/:id', this.middleware.passAuth('jwt'), (req, res) =>
			this.controller.getCandidateById(req, res)
		);

		this.router.post(
			'/candidate',
			this.middleware.passAuth('jwt'),
			(req, res, next) => this.middleware.checkAdminRole(req, res, next),
			(req, res, next) => this.middleware.validateCandidate(req, res, next),
			(req, res) => this.controller.createCandidate(req, res)
		);

		this.router.put(
			'/candidate/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => this.middleware.checkAdminRole(req, res, next),
			(req, res) => this.controller.updateCandidate(req, res)
		);

		this.router.delete(
			'/candidate/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => this.middleware.checkAdminRole(req, res, next),
			(req, res) => this.controller.deleteCandidate(req, res)
		);
	}
}
