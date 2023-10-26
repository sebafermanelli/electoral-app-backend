import { Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { CandidateService } from '../services/candidate.service';
import { ListService } from '../../list/services/list.service';
import { RoleService } from '../../role/services/role.service';
import { VoterService } from '../../voter/services/voter.service';

export class CandidateController {
	constructor(
		private readonly httpResponse: HttpResponse = new HttpResponse(),
		private readonly candidateService: CandidateService = new CandidateService(),
		private readonly voterService: VoterService = new VoterService(),
		private readonly roleService: RoleService = new RoleService(),
		private readonly listService: ListService = new ListService()
	) {}

	async getAllCandidates(req: Request, res: Response) {
		try {
			const data = await this.candidateService.findAllCandidates();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getCandidateById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.candidateService.findCandidateById(id);
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async createCandidate(req: Request, res: Response) {
		const { voter, role, list, delegation } = req.body;
		try {
			const voterExist = await this.voterService.findVoterById(voter);
			if (!voterExist) {
				return this.httpResponse.NotFound(res, 'El usuario no existe');
			}
			const roleExist = await this.roleService.findRoleById(role);
			if (!roleExist) {
				return this.httpResponse.NotFound(res, 'El rol no existe');
			}
			const listExist = await this.listService.findListById(list);
			if (!listExist) {
				return this.httpResponse.NotFound(res, 'La lista no existe');
			}
			if (delegation) {
				return this.httpResponse.Error(res, 'La delegacion se asigna automaticamente');
			}
			if (roleExist.election.id != listExist.election.id) {
				return this.httpResponse.Error(res, 'El rol y la lista no son de la misma eleccion');
			}
			const position = await this.candidateService.findCandidateByListAndRole(list, role);
			if (position) {
				return this.httpResponse.Error(res, 'El rol en la lista esta ocupado');
			}
			const candidates = await this.candidateService.findCandidatesByVoter(voter);
			let candidateExist = false;
			if (candidates) {
				candidates.map(async (candidate) => {
					if (
						candidate.list.election.id === listExist.election.id ||
						candidate.role.election.id === roleExist.election.id
					) {
						return (candidateExist = true);
					}
				});
			}
			if (candidateExist) {
				return this.httpResponse.Error(res, 'El usuario esta ocupando un rol en la eleccion');
			}
			const data = await this.candidateService.createCandidate(req.body);
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteCandidate(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.candidateService.deleteCandidate(id);
			if (!data.affected) {
				return this.httpResponse.NotFound(res, 'Hay un error en borrar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async updateCandidate(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.candidateService.updateCandidate(id, req.body);
			if (!data.affected) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}
}
