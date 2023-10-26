import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { SharedEntity } from '../../shared/entities/shared.entity';
import { VoteEntity } from '../../election/entities/vote.entity';
import { CandidateEntity } from '../../candidate/entities/candidate.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'voters' })
export class VoterEntity extends SharedEntity {
	@OneToOne(() => UserEntity, (user) => user.voter, { nullable: false })
	@JoinColumn()
	user!: UserEntity;

	@OneToMany(() => VoteEntity, (vote) => vote.voter)
	votes!: VoteEntity[];

	@OneToMany(() => CandidateEntity, (candidate) => candidate.voter)
	candidates!: CandidateEntity[];
}
