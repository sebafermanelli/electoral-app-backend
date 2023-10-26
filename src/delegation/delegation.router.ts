import { SharedRouter } from '../shared/router/shared.router';
import { DelegationController } from './controllers/delegation.controller';
import { DelegationMiddleware } from './middlewares/delegation.middleware';

export class DelegationRouter extends SharedRouter<DelegationController, DelegationMiddleware> {
	constructor() {
		super(DelegationController, DelegationMiddleware);
	}

	routes(): void {
		this.router.get('/delegation', this.middleware.passAuth('jwt'), (req, res) =>
			this.controller.getAllDelegations(req, res)
		);

		this.router.get('/delegation/:id', this.middleware.passAuth('jwt'), (req, res) =>
			this.controller.getDelegationById(req, res)
		);

		this.router.post(
			'/delegation',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [
				this.middleware.checkAdminRole(req, res, next),
				this.middleware.validateDelegation(req, res, next),
			],
			(req, res) => this.controller.createDelegation(req, res)
		);

		this.router.put(
			'/delegation/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.updateDelegation(req, res)
		);

		this.router.delete(
			'/delegation/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.deleteDelegation(req, res)
		);
	}
}
