import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { SharedEntity } from '../../shared/entities/shared.entity';
import { CandidateEntity } from '../../candidate/entities/candidate.entity';
import { ElectionEntity } from '../../election/entities/election.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends SharedEntity {
	@Column()
	name!: string;

	@Column()
	order!: number;

	@Column({ default: false })
	dhondt?: boolean;

	@ManyToOne(() => ElectionEntity, (election) => election.roles, { nullable: false })
	election!: ElectionEntity;

	@OneToMany(() => CandidateEntity, (candidate) => candidate.role)
	candidates!: CandidateEntity[];
}
