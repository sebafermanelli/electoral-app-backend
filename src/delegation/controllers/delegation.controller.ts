import { Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { DelegationService } from '../services/delegation.service';
import { ElectionService } from '../../election/services/election.service';

export class DelegationController {
	constructor(
		private readonly httpResponse: HttpResponse = new HttpResponse(),
		private readonly delegationService: DelegationService = new DelegationService(),
		private readonly electionService: ElectionService = new ElectionService()
	) {}

	async getAllDelegations(req: Request, res: Response) {
		try {
			const data = await this.delegationService.findAllDelegations();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getDelegationById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.delegationService.findDelegationById(id);
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async createDelegation(req: Request, res: Response) {
		const { election } = req.body;
		try {
			const electionExist = await this.electionService.findElectionById(election);
			if (!electionExist) {
				return this.httpResponse.NotFound(res, 'La eleccion no existe');
			}
			const delegation = await this.delegationService.findDelegationByElection(election);
			if (delegation) {
				return this.httpResponse.Error(res, 'La delegacion ya existe');
			}
			const data = await this.delegationService.createDelegation(req.body);
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteDelegation(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.delegationService.deleteDelegation(id);
			if (!data.affected) {
				return this.httpResponse.NotFound(res, 'Hay un error en borrar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async updateDelegation(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.delegationService.updateDelegation(id, req.body);
			if (!data.affected) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}
}
