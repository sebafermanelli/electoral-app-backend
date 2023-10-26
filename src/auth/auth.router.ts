import { SharedMiddleware } from '../shared/middleware/shared.middleware';
import { SharedRouter } from '../shared/router/shared.router';
import { AuthController } from './controllers/auth.controller';

export class AuthRouter extends SharedRouter<AuthController, SharedMiddleware> {
	constructor() {
		super(AuthController, SharedMiddleware);
	}

	routes(): void {
		this.router.post('/auth/login', this.middleware.passAuth('login'), (req, res) =>
			this.controller.login(req, res)
		);
	}
}
