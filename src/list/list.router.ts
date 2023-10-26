import { SharedRouter } from '../shared/router/shared.router';
import { ListController } from './controllers/list.controller';
import { ListMiddleware } from './middlewares/list.middleware';

export class ListRouter extends SharedRouter<ListController, ListMiddleware> {
	constructor() {
		super(ListController, ListMiddleware);
	}

	routes(): void {
		this.router.get('/list', this.middleware.passAuth('jwt'), (req, res) =>
			this.controller.getAllLists(req, res)
		);

		this.router.get('/list/:id', this.middleware.passAuth('jwt'), (req, res) =>
			this.controller.getListById(req, res)
		);

		this.router.post(
			'/list',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [
				this.middleware.checkAdminRole(req, res, next),
				this.middleware.validateList(req, res, next),
			],
			(req, res) => this.controller.createList(req, res)
		);

		this.router.put(
			'/list/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.updateList(req, res)
		);

		this.router.delete(
			'/list/:id',
			this.middleware.passAuth('jwt'),
			(req, res, next) => [this.middleware.checkAdminRole(req, res, next)],
			(req, res) => this.controller.deleteList(req, res)
		);
	}
}
