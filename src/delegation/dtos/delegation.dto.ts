import { IsNotEmpty } from 'class-validator';
import { SharedDTO } from '../../shared/dtos/shared.dto';
import { ElectionEntity } from '../../election/entities/election.entity';

export class DelegationDTO extends SharedDTO {
	@IsNotEmpty()
	election!: ElectionEntity;
}
