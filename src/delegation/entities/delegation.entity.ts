import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { SharedEntity } from '../../shared/entities/shared.entity';
import { ElectionEntity } from '../../election/entities/election.entity';
import { CandidateEntity } from '../../candidate/entities/candidate.entity';

@Entity({ name: 'delegations' })
export class DelegationEntity extends SharedEntity {
	@OneToOne(() => ElectionEntity, (election) => election.delegation, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn()
	election!: ElectionEntity;

	@OneToMany(() => CandidateEntity, (candidate) => candidate.delegation, {
		cascade: ['insert', 'update', 'remove'],
	})
	candidates!: CandidateEntity[];
}
