import { DeleteResult, UpdateResult } from 'typeorm';
import { SharedService } from '../../shared/service/shared.service';
import { VoteDTO } from '../dtos/vote.dto';
import { VoteEntity } from '../entities/vote.entity';
import { ListService } from '../../list/services/list.service';

export class VoteService extends SharedService<VoteEntity> {
	constructor(private readonly listService: ListService = new ListService()) {
		super(VoteEntity);
	}

	async findAllVotes(): Promise<VoteEntity[]> {
		return (await this.execRepository)
			.createQueryBuilder('vote')
			.leftJoinAndSelect('vote.election', 'election')
			.leftJoinAndSelect('vote.voter', 'voter')
			.getMany();
	}

	async findVoteById(id: string): Promise<VoteEntity | null> {
		return (await this.execRepository)
			.createQueryBuilder('vote')
			.leftJoinAndSelect('vote.election', 'election')
			.leftJoinAndSelect('vote.voter', 'voter')
			.where({ id })
			.getOne();
	}

	async findVoteByElectionAndVoter(election: string, voter: string): Promise<VoteEntity | null> {
		return (await this.execRepository)
			.createQueryBuilder('vote')
			.innerJoinAndSelect('vote.election', 'election')
			.innerJoinAndSelect('vote.voter', 'voter')
			.where({ election })
			.andWhere({ voter })
			.getOne();
	}

	async createVote(body: VoteDTO, list_id: string): Promise<VoteEntity> {
		// La lista votada incrementa sus votos en 1
		const list = await this.listService.findListById(list_id);
		list!.votes++;
		const listDTO = {
			name: list!.name,
			election: list!.election,
			votes: list!.votes,
		};
		await this.listService.updateList(list!.id, listDTO);
		return (await this.execRepository).save(body);
	}

	async deleteVote(id: string): Promise<DeleteResult> {
		return (await this.execRepository).delete({ id });
	}

	async updateVote(id: string, infoUpdate: VoteDTO): Promise<UpdateResult> {
		return (await this.execRepository).update(id, infoUpdate);
	}
}
