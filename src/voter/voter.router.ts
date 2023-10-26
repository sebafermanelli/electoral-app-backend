import { SharedRouter } from '../shared/router/shared.router';
import { VoterController } from './controllers/voter.controller';
import { VoterMiddleware } from './middlewares/voter.middleware';

export class VoterRouter extends SharedRouter<VoterController, VoterMiddleware> {
	constructor() {
		super(VoterController, VoterMiddleware);
	}

	routes(): void {
		this.router.get('/voter', this.middleware.passAuth('jwt'), (req, res) =>
			this.controller.getAllVoters(req, res)
		);

		this.router.get('/voter/:id', this.middleware.passAuth('jwt'), (req, res) =>
			this.controller.getVoterById(req, res)
		);

		this.router.post(
			'/voter',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [
				this.middleware.checkAdminRole(req, res, next),
				this.middleware.validateVoter(req, res, next),
			],
			(req, res) => this.controller.createVoter(req, res)
		);

		this.router.put(
			'/voter/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.updateVoter(req, res)
		);

		this.router.delete(
			'/voter/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.deleteVoter(req, res)
		);
	}
}
