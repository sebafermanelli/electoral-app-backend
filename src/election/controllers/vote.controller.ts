import { Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { VoteService } from '../services/vote.service';
import { ElectionService } from '../services/election.service';
import { ListService } from '../../list/services/list.service';
import { VoterService } from '../../voter/services/voter.service';
import { UserEntity } from '../../user/entities/user.entity';

export class VoteController {
	constructor(
		private readonly httpResponse: HttpResponse = new HttpResponse(),
		private readonly voteService: VoteService = new VoteService(),
		private readonly voterService: VoterService = new VoterService(),
		private readonly electionService: ElectionService = new ElectionService(),
		private readonly listService: ListService = new ListService()
	) {}

	async getAllVotes(req: Request, res: Response) {
		try {
			const data = await this.voteService.findAllVotes();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getVoteById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.voteService.findVoteById(id);
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async createVote(req: Request, res: Response) {
		const { voter, election, list } = req.body;
		try {
			const voterExist = await this.voterService.findVoterById(voter);
			if (!voterExist) {
				return this.httpResponse.NotFound(res, 'El usuario no existe');
			}
			const electionExist = await this.electionService.findElectionById(election);
			if (!electionExist) {
				return this.httpResponse.NotFound(res, 'La eleccion no existe');
			}
			const listExist = await this.listService.findListById(list);
			if (!listExist) {
				return this.httpResponse.NotFound(res, 'La lista no existe');
			}
			if (electionExist.startDate < new Date()) {
				return this.httpResponse.Error(res, 'La votacion todavia no empezo');
			}
			if (electionExist.endDate < new Date()) {
				return this.httpResponse.Error(res, 'La votacion ya finalizo');
			}
			if (listExist.election.id != electionExist.id) {
				return this.httpResponse.NotFound(res, 'La lista no existe en esa eleccion');
			}
			const vote = await this.voteService.findVoteByElectionAndVoter(election, voter);
			if (vote) {
				return this.httpResponse.Error(res, 'El voto ya fue emitido');
			}
			const data = await this.voteService.createVote(req.body, list);
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteVote(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.voteService.deleteVote(id);
			if (!data.affected) {
				return this.httpResponse.NotFound(res, 'Hay un error en borrar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async updateVote(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.voteService.updateVote(id, req.body);
			if (!data.affected) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}
}
