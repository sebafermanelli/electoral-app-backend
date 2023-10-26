import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { SharedDTO } from '../../shared/dtos/shared.dto';

export class ElectionDTO extends SharedDTO {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsDateString()
	@IsNotEmpty()
	startDate!: Date;

	@IsDateString()
	@IsNotEmpty()
	endDate!: Date;
}
