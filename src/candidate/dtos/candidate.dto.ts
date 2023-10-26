import { IsNotEmpty, IsOptional } from 'class-validator';
import { SharedDTO } from '../../shared/dtos/shared.dto';
import { DelegationEntity } from '../../delegation/entities/delegation.entity';
import { ListEntity } from '../../list/entities/list.entity';
import { RoleEntity } from '../../role/entities/role.entity';
import { VoterEntity } from '../../voter/entities/voter.entity';

export class CandidateDTO extends SharedDTO {
	@IsNotEmpty()
	voter!: VoterEntity;

	@IsNotEmpty()
	role!: RoleEntity;

	@IsNotEmpty()
	list!: ListEntity;

	@IsOptional()
	delegation?: DelegationEntity;
}
