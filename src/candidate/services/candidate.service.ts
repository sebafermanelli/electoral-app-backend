import { DeleteResult, UpdateResult } from 'typeorm';
import { SharedService } from '../../shared/service/shared.service';
import { CandidateDTO } from '../dtos/candidate.dto';
import { CandidateEntity } from '../entities/candidate.entity';

export class CandidateService extends SharedService<CandidateEntity> {
	constructor() {
		super(CandidateEntity);
	}

	async findAllCandidates(): Promise<CandidateEntity[]> {
		return (await this.execRepository)
			.createQueryBuilder('candidate')
			.leftJoinAndSelect('candidate.voter', 'voter')
			.leftJoinAndSelect('voter.user', 'userVoter')
			.leftJoinAndSelect('candidate.role', 'role')
			.leftJoinAndSelect('role.election', 'electionRole')
			.leftJoinAndSelect('candidate.list', 'list')
			.leftJoinAndSelect('list.election', 'electionList')
			.leftJoinAndSelect('candidate.delegation', 'delegation')
			.getMany();
	}

	async findCandidateById(id: string): Promise<CandidateEntity | null> {
		return (await this.execRepository)
			.createQueryBuilder('candidate')
			.leftJoinAndSelect('candidate.voter', 'voter')
			.leftJoinAndSelect('voter.user', 'userVoter')
			.leftJoinAndSelect('candidate.role', 'role')
			.leftJoinAndSelect('role.election', 'electionRole')
			.leftJoinAndSelect('candidate.list', 'list')
			.leftJoinAndSelect('list.election', 'electionList')
			.leftJoinAndSelect('candidate.delegation', 'delegation')
			.where({ id })
			.getOne();
	}

	async findCandidateByListAndRole(list: string, role: string): Promise<CandidateEntity | null> {
		return (await this.execRepository)
			.createQueryBuilder('candidate')
			.leftJoinAndSelect('candidate.voter', 'voter')
			.leftJoinAndSelect('voter.user', 'userVoter')
			.leftJoinAndSelect('candidate.role', 'role')
			.leftJoinAndSelect('role.election', 'electionRole')
			.leftJoinAndSelect('candidate.list', 'list')
			.leftJoinAndSelect('list.election', 'electionList')
			.leftJoinAndSelect('candidate.delegation', 'delegation')
			.where({ list })
			.andWhere({ role })
			.getOne();
	}

	async findCandidatesByVoter(voter: string): Promise<CandidateEntity[] | null> {
		return (await this.execRepository)
			.createQueryBuilder('candidate')
			.leftJoinAndSelect('candidate.voter', 'voter')
			.leftJoinAndSelect('voter.user', 'userVoter')
			.leftJoinAndSelect('candidate.role', 'role')
			.leftJoinAndSelect('role.election', 'electionRole')
			.leftJoinAndSelect('candidate.list', 'list')
			.leftJoinAndSelect('list.election', 'electionList')
			.leftJoinAndSelect('candidate.delegation', 'delegation')
			.where({ voter })
			.getMany();
	}

	async findCandidateByDelegationAndRole(
		delegation: string,
		role: string
	): Promise<CandidateEntity | null> {
		return (await this.execRepository)
			.createQueryBuilder('candidate')
			.leftJoinAndSelect('candidate.voter', 'voter')
			.leftJoinAndSelect('voter.user', 'userVoter')
			.leftJoinAndSelect('candidate.role', 'role')
			.leftJoinAndSelect('role.election', 'electionRole')
			.leftJoinAndSelect('candidate.list', 'list')
			.leftJoinAndSelect('list.election', 'electionList')
			.leftJoinAndSelect('candidate.delegation', 'delegation')
			.andWhere({ delegation })
			.andWhere({ role })
			.getOne();
	}

	async createCandidate(body: CandidateDTO): Promise<CandidateEntity> {
		return (await this.execRepository).save(body);
	}

	async deleteCandidate(id: string): Promise<DeleteResult> {
		return (await this.execRepository).delete({ id });
	}

	async updateCandidate(id: string, infoUpdate: CandidateDTO): Promise<UpdateResult> {
		return (await this.execRepository).update(id, infoUpdate);
	}
}
