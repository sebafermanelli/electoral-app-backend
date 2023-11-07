import { Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { ElectionService } from '../services/election.service';
import { DelegationService } from '../../delegation/services/delegation.service';
import { DelegationDTO } from '../../delegation/dtos/delegation.dto';

export class ElectionController {
	constructor(
		private readonly httpResponse: HttpResponse = new HttpResponse(),
		private readonly electionService: ElectionService = new ElectionService(),
		private readonly delegationService: DelegationService = new DelegationService()
	) {}

	async getAllElections(req: Request, res: Response) {
		try {
			const data = await this.electionService.findAllElections();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getElectionById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.electionService.findElectionById(id);
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async createElection(req: Request, res: Response) {
		try {
			const data = await this.electionService.createElection(req.body);
			const delegation: DelegationDTO = {
				election: data,
			};
			await this.delegationService.createDelegation(delegation);
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteElection(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.electionService.deleteElection(id);
			if (!data.affected) {
				return this.httpResponse.NotFound(res, 'Hay un error en borrar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async updateElection(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.electionService.updateElection(id, req.body);
			if (!data.affected) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async genResults(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const electionExist = await this.electionService.findElectionById(id);
			if (!electionExist) {
				return this.httpResponse.NotFound(res, 'La eleccion no existe');
			}
			if (!electionExist.delegation || !electionExist.lists || !electionExist.roles) {
				return this.httpResponse.NotFound(res, 'La estructura de la eleccion no esta completa');
			}
			if (!electionExist.votes) {
				return this.httpResponse.NotFound(res, 'No hay votos registrados');
			}
			if (electionExist.delegation.candidates.length > 0) {
				return this.httpResponse.Error(res, 'La delegacion ya fue designada');
			}
			const data = await this.electionService.genResultsElection(electionExist);
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}
}
