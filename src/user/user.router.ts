import { SharedRouter } from '../shared/router/shared.router';
import { UserController } from './controllers/user.controller';
import { UserMiddleware } from './middlewares/user.middleware';

export class UserRouter extends SharedRouter<UserController, UserMiddleware> {
	constructor() {
		super(UserController, UserMiddleware);
	}

	routes(): void {
		this.router.get('/user', this.middleware.passAuth('jwt'), (req, res) =>
			this.controller.getAllUsers(req, res)
		);

		this.router.get('/user/:id', this.middleware.passAuth('jwt'), (req, res) =>
			this.controller.getUserById(req, res)
		);

		this.router.post(
			'/user',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [
				this.middleware.checkAdminRole(req, res, next),
				this.middleware.validateUser(req, res, next),
			],
			(req, res) => this.controller.createUser(req, res)
		);

		this.router.put(
			'/user/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.updateUser(req, res)
		);

		this.router.delete(
			'/user/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.deleteUser(req, res)
		);

		this.router.put('/user/:username/code', (req, res) => this.controller.genCode(req, res));
	}
}
