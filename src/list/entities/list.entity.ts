import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { SharedEntity } from '../../shared/entities/shared.entity';
import { ElectionEntity } from '../../election/entities/election.entity';
import { CandidateEntity } from '../../candidate/entities/candidate.entity';

@Entity({ name: 'lists' })
export class ListEntity extends SharedEntity {
	@Column()
	name!: string;

	@Column({ default: 0 })
	votes!: number;

	@ManyToOne(() => ElectionEntity, (election) => election.lists, { nullable: false })
	election!: ElectionEntity;

	@OneToMany(() => CandidateEntity, (candidate) => candidate.list)
	candidates!: CandidateEntity[];
}
