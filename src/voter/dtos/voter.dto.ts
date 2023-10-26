import { IsNotEmpty } from 'class-validator';
import { SharedDTO } from '../../shared/dtos/shared.dto';
import { UserEntity } from '../../user/entities/user.entity';

export class VoterDTO extends SharedDTO {
	@IsNotEmpty()
	user!: UserEntity;
}
