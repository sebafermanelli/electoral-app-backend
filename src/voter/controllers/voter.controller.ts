import { Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { VoterService } from '../services/voter.service';

export class VoterController {
	constructor(
		private readonly httpResponse: HttpResponse = new HttpResponse(),
		private readonly voterService: VoterService = new VoterService()
	) {}

	async getAllVoters(req: Request, res: Response) {
		try {
			const data = await this.voterService.findAllVoters();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getVoterById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.voterService.findVoterById(id);
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async createVoter(req: Request, res: Response) {
		const { user } = req.body;
		try {
			const voterByUser = await this.voterService.findVoterByUser(user);
			if (voterByUser) {
				return this.httpResponse.Error(res, 'El votante ya existe');
			}
			const data = await this.voterService.createVoter(req.body);
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteVoter(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.voterService.deleteVoter(id);
			if (!data.affected) {
				return this.httpResponse.NotFound(res, 'Hay un error en borrar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async updateVoter(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.voterService.updateVoter(id, req.body);
			if (!data.affected) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}
}
