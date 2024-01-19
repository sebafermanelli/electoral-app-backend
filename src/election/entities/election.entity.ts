import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { SharedEntity } from '../../shared/entities/shared.entity';
import { VoteEntity } from './vote.entity';
import { ListEntity } from '../../list/entities/list.entity';
import { RoleEntity } from '../../role/entities/role.entity';
import { DelegationEntity } from '../../delegation/entities/delegation.entity';

@Entity({ name: 'elections' })
export class ElectionEntity extends SharedEntity {
	@Column()
	name!: string;

	@Column()
	finalizated!: boolean;

	@OneToMany(() => VoteEntity, (vote) => vote.election)
	votes!: VoteEntity[];

	@OneToMany(() => ListEntity, (list) => list.election)
	lists!: ListEntity[];

	@OneToMany(() => RoleEntity, (role) => role.election)
	roles!: RoleEntity[];

	@OneToOne(() => DelegationEntity, (delegation) => delegation.election)
	delegation!: DelegationEntity;
}
