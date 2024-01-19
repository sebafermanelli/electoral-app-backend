import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SharedDTO } from '../../shared/dtos/shared.dto';

export class ElectionDTO extends SharedDTO {
	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsBoolean()
	@IsOptional()
	finalizated!: boolean;
}
