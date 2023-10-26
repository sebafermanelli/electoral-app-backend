import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SharedDTO } from '../../shared/dtos/shared.dto';
import { ElectionEntity } from '../../election/entities/election.entity';

export class ListDTO extends SharedDTO {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsOptional()
	votes?: number;

	@IsNotEmpty()
	election!: ElectionEntity;
}
