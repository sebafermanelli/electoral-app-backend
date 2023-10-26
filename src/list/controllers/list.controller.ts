import { Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { ListService } from '../services/list.service';
import { ElectionService } from '../../election/services/election.service';

export class ListController {
	constructor(
		private readonly httpResponse: HttpResponse = new HttpResponse(),
		private readonly listService: ListService = new ListService(),
		private readonly electionService: ElectionService = new ElectionService()
	) {}

	async getAllLists(req: Request, res: Response) {
		try {
			const data = await this.listService.findAllLists();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getListById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.listService.findListById(id);
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async createList(req: Request, res: Response) {
		const { election } = req.body;
		try {
			const electionExist = await this.electionService.findElectionById(election);
			if (!electionExist) {
				return this.httpResponse.NotFound(res, 'La eleccion no existe');
			}
			req.body.votes = 0;
			const data = await this.listService.createList(req.body);
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteList(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.listService.deleteList(id);
			if (!data.affected) {
				return this.httpResponse.NotFound(res, 'Hay un error en borrar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async updateList(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.listService.updateList(id, req.body);
			if (!data.affected) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}
}
