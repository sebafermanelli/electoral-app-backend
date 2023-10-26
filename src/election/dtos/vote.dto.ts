import { IsNotEmpty, IsString } from 'class-validator';
import { SharedDTO } from '../../shared/dtos/shared.dto';
import { VoterEntity } from '../../voter/entities/voter.entity';
import { ElectionEntity } from '../entities/election.entity';

export class VoteDTO extends SharedDTO {
	@IsNotEmpty()
	voter!: VoterEntity;

	@IsNotEmpty()
	election!: ElectionEntity;
}
