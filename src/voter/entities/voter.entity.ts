import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { SharedEntity } from '../../shared/entities/shared.entity';
import { VoteEntity } from '../../election/entities/vote.entity';
import { CandidateEntity } from '../../candidate/entities/candidate.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'voters' })
export class VoterEntity extends SharedEntity {
	@OneToOne(() => UserEntity, (user) => user.voter, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	@JoinColumn()
	user!: UserEntity;

	@OneToMany(() => VoteEntity, (vote) => vote.voter, { cascade: ['insert', 'update', 'remove'] })
	votes!: VoteEntity[];

	@OneToMany(() => CandidateEntity, (candidate) => candidate.voter, {
		cascade: ['insert', 'update', 'remove'],
	})
	candidates!: CandidateEntity[];
}
