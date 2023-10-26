import { Entity, ManyToOne } from 'typeorm';
import { SharedEntity } from '../../shared/entities/shared.entity';
import { VoterEntity } from '../../voter/entities/voter.entity';
import { ElectionEntity } from './election.entity';

@Entity({ name: 'votes' })
export class VoteEntity extends SharedEntity {
	@ManyToOne(() => VoterEntity, (voter) => voter.votes, { nullable: false })
	voter!: VoterEntity;

	@ManyToOne(() => ElectionEntity, (election) => election.votes, { nullable: false })
	election!: ElectionEntity;
}
