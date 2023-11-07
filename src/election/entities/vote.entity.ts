import { Entity, ManyToOne } from 'typeorm';
import { SharedEntity } from '../../shared/entities/shared.entity';
import { VoterEntity } from '../../voter/entities/voter.entity';
import { ElectionEntity } from './election.entity';

@Entity({ name: 'votes' })
export class VoteEntity extends SharedEntity {
	@ManyToOne(() => VoterEntity, (voter) => voter.votes, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	voter!: VoterEntity;

	@ManyToOne(() => ElectionEntity, (election) => election.votes, {
		nullable: false,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	election!: ElectionEntity;
}
