import { SharedRouter } from '../shared/router/shared.router';
import { ElectionController } from './controllers/election.controller';
import { ElectionMiddleware } from './middlewares/election.middleware';

export class ElectionRouter extends SharedRouter<ElectionController, ElectionMiddleware> {
	constructor() {
		super(ElectionController, ElectionMiddleware);
	}

	routes(): void {
		this.router.get('/election', this.middleware.passAuth('jwt'), (req, res) =>
			this.controller.getAllElections(req, res)
		);

		this.router.get('/election/:id', this.middleware.passAuth('jwt'), (req, res) =>
			this.controller.getElectionById(req, res)
		);

		this.router.post(
			'/election',
			this.middleware.passAuth('jwt'),
			(req, res, next) => this.middleware.checkAdminRole(req, res, next),
			(req, res, next) => this.middleware.validateElection(req, res, next),
			(req, res) => this.controller.createElection(req, res)
		);

		this.router.put(
			'/election/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => this.middleware.checkAdminRole(req, res, next),
			(req, res) => this.controller.updateElection(req, res)
		);

		this.router.delete(
			'/election/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => this.middleware.checkAdminRole(req, res, next),
			(req, res) => this.controller.deleteElection(req, res)
		);

		this.router.put(
			'/election/:id/results',
			this.middleware.passAuth('jwt'),
			(req, res, next) => this.middleware.checkAdminRole(req, res, next),
			(req, res) => this.controller.genResults(req, res)
		);
	}
}
