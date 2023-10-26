import { DeleteResult, UpdateResult } from 'typeorm';
import { SharedService } from '../../shared/service/shared.service';
import { VoterDTO } from '../dtos/voter.dto';
import { VoterEntity } from '../entities/voter.entity';

export class VoterService extends SharedService<VoterEntity> {
	constructor() {
		super(VoterEntity);
	}

	async findAllVoters(): Promise<VoterEntity[]> {
		return (await this.execRepository)
			.createQueryBuilder('voter')
			.leftJoinAndSelect('voter.user', 'user')
			.leftJoinAndSelect('voter.votes', 'votes')
			.leftJoinAndSelect('voter.candidates', 'candidates')
			.getMany();
	}

	async findVoterById(id: string): Promise<VoterEntity | null> {
		return (await this.execRepository)
			.createQueryBuilder('voter')
			.leftJoinAndSelect('voter.user', 'user')
			.leftJoinAndSelect('voter.votes', 'votes')
			.leftJoinAndSelect('voter.candidates', 'candidates')
			.where({ id })
			.getOne();
	}

	async findVoterByUser(user: string): Promise<VoterEntity | null> {
		return (await this.execRepository)
			.createQueryBuilder('voter')
			.leftJoinAndSelect('voter.user', 'user')
			.leftJoinAndSelect('voter.votes', 'votes')
			.leftJoinAndSelect('voter.candidates', 'candidates')
			.where({ user })
			.getOne();
	}

	async createVoter(body: VoterDTO): Promise<VoterEntity> {
		return (await this.execRepository).save(body);
	}

	async deleteVoter(id: string): Promise<DeleteResult> {
		return (await this.execRepository).delete({ id });
	}

	async updateVoter(id: string, infoUpdate: VoterDTO): Promise<UpdateResult> {
		return (await this.execRepository).update(id, infoUpdate);
	}
}
