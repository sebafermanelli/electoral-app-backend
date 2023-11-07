import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SharedDTO } from '../../shared/dtos/shared.dto';
import { VoterEntity } from '../../voter/entities/voter.entity';
import { ElectionEntity } from '../entities/election.entity';

export class VoteDTO extends SharedDTO {
	@IsOptional()
	voter!: VoterEntity;

	@IsNotEmpty()
	election!: ElectionEntity;
}
