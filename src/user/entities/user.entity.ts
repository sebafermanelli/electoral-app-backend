import { Column, Entity, OneToOne } from 'typeorm';
import { SharedEntity } from '../../shared/entities/shared.entity';
import { VoterEntity } from '../../voter/entities/voter.entity';
import { RoleType } from '../dtos/user.dto';

@Entity({ name: 'users' })
export class UserEntity extends SharedEntity {
	@Column({ unique: true })
	username!: string;

	@Column({ unique: true })
	email!: string;

	@Column({ select: false })
	password!: string;

	@Column()
	name!: string;

	@Column()
	lastname!: string;

	@Column({ type: 'enum', enum: RoleType, nullable: false })
	role!: RoleType;

	@OneToOne(() => VoterEntity, (voter) => voter.user)
	voter?: VoterEntity;
}
