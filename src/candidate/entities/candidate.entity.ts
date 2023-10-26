import { Entity, ManyToOne } from 'typeorm';
import { SharedEntity } from '../../shared/entities/shared.entity';
import { VoterEntity } from '../../voter/entities/voter.entity';
import { ListEntity } from '../../list/entities/list.entity';
import { RoleEntity } from '../../role/entities/role.entity';
import { DelegationEntity } from '../../delegation/entities/delegation.entity';

@Entity({ name: 'candidates' })
export class CandidateEntity extends SharedEntity {
	@ManyToOne(() => VoterEntity, (voter) => voter.candidates, { nullable: false })
	voter!: VoterEntity;

	@ManyToOne(() => RoleEntity, (role) => role.candidates, { nullable: false })
	role!: RoleEntity;

	@ManyToOne(() => ListEntity, (list) => list.candidates, { nullable: false })
	list!: ListEntity;

	@ManyToOne(() => DelegationEntity, (delegation) => delegation.candidates, { nullable: true })
	delegation?: DelegationEntity;
}
