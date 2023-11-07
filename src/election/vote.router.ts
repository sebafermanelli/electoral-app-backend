import { SharedRouter } from '../shared/router/shared.router';
import { VoteController } from './controllers/vote.controller';
import { VoteMiddleware } from './middlewares/vote.middleware';

export class VoteRouter extends SharedRouter<VoteController, VoteMiddleware> {
	constructor() {
		super(VoteController, VoteMiddleware);
	}

	routes(): void {
		this.router.get('/vote', this.middleware.passAuth('jwt'), (req, res) =>
			this.controller.getAllVotes(req, res)
		);

		this.router.get('/vote/:id', this.middleware.passAuth('jwt'), (req, res) =>
			this.controller.getVoteById(req, res)
		);

		this.router.post(
			'/vote',
			this.middleware.passAuth('jwt'),
			(req, res, next) => this.middleware.validateVote(req, res, next),
			(req, res) => this.controller.createVote(req, res)
		);

		this.router.put(
			'/vote/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => this.middleware.checkAdminRole(req, res, next),
			(req, res) => this.controller.updateVote(req, res)
		);

		this.router.delete(
			'/vote/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => this.middleware.checkAdminRole(req, res, next),
			(req, res) => this.controller.deleteVote(req, res)
		);
	}
}
