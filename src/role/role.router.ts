import { SharedRouter } from '../shared/router/shared.router';
import { RoleController } from './controllers/role.controller';
import { RoleMiddleware } from './middlewares/role.middleware';

export class RoleRouter extends SharedRouter<RoleController, RoleMiddleware> {
	constructor() {
		super(RoleController, RoleMiddleware);
	}

	routes(): void {
		this.router.get('/role', this.middleware.passAuth('jwt'), (req, res) =>
			this.controller.getAllRoles(req, res)
		);

		this.router.get('/role/:id', this.middleware.passAuth('jwt'), (req, res) =>
			this.controller.getRoleById(req, res)
		);

		this.router.post(
			'/role',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [
				this.middleware.checkAdminRole(req, res, next),
				this.middleware.validateRole(req, res, next),
			],
			(req, res) => this.controller.createRole(req, res)
		);

		this.router.put(
			'/role/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.updateRole(req, res)
		);

		this.router.delete(
			'/role/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.deleteRole(req, res)
		);
	}
}
