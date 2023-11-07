import { IsBoolean, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString } from 'class-validator';
import { SharedDTO } from '../../shared/dtos/shared.dto';
import { ElectionEntity } from '../../election/entities/election.entity';

export class RoleDTO extends SharedDTO {
	@IsString()
	@IsNotEmpty()
	name!: string;
	
	@IsNumberString()
	@IsNotEmpty()
	order!: number;

	@IsBoolean()
	@IsOptional()
	dhondt?: boolean;

	@IsNotEmpty()
	election!: ElectionEntity;
}
