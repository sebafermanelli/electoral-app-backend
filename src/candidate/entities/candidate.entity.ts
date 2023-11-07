import { Entity, ManyToOne } from 'typeorm';
import { SharedEntity } from '../../shared/entities/shared.entity';
import { VoterEntity } from '../../voter/entities/voter.entity';
import { ListEntity } from '../../list/entities/list.entity';
import { RoleEntity } from '../../role/entities/role.entity';
import { DelegationEntity } from '../../delegation/entities/delegation.entity';

@Entity({ name: 'candidates' })
export class CandidateEntity extends SharedEntity {
	@ManyToOne(() => VoterEntity, (voter) => voter.candidates, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	voter!: VoterEntity;

	@ManyToOne(() => RoleEntity, (role) => role.candidates, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	role!: RoleEntity;

	@ManyToOne(() => ListEntity, (list) => list.candidates, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	list!: ListEntity;

	@ManyToOne(() => DelegationEntity, (delegation) => delegation.candidates, {
		nullable: true,
		onDelete: 'SET NULL',
		onUpdate: 'SET NULL',
	})
	delegation?: DelegationEntity;
}
