import { DeleteResult, UpdateResult } from 'typeorm';
import { SharedService } from '../../shared/service/shared.service';
import { DelegationDTO } from '../dtos/delegation.dto';
import { DelegationEntity } from '../entities/delegation.entity';

export class DelegationService extends SharedService<DelegationEntity> {
	constructor() {
		super(DelegationEntity);
	}

	async findAllDelegations(): Promise<DelegationEntity[]> {
		return (await this.execRepository)
			.createQueryBuilder('delegation')
			.leftJoinAndSelect('delegation.election', 'election')
			.leftJoinAndSelect('delegation.candidates', 'candidates')
			.getMany();
	}

	async findDelegationById(id: string): Promise<DelegationEntity | null> {
		return (await this.execRepository)
			.createQueryBuilder('delegation')
			.leftJoinAndSelect('delegation.election', 'election')
			.leftJoinAndSelect('delegation.candidates', 'candidates')
			.where({ id })
			.getOne();
	}

	async findDelegationByElection(election: string): Promise<DelegationEntity | null> {
		return (await this.execRepository)
			.createQueryBuilder('delegation')
			.leftJoinAndSelect('delegation.election', 'election')
			.leftJoinAndSelect('delegation.candidates', 'candidates')
			.where({ election })
			.getOne();
	}

	async createDelegation(body: DelegationDTO): Promise<DelegationEntity> {
		return (await this.execRepository).save(body);
	}

	async deleteDelegation(id: string): Promise<DeleteResult> {
		return (await this.execRepository).delete({ id });
	}

	async updateDelegation(id: string, infoUpdate: DelegationDTO): Promise<UpdateResult> {
		return (await this.execRepository).update(id, infoUpdate);
	}
}
