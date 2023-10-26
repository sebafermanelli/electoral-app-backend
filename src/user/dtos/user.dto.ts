import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { SharedDTO } from '../../shared/dtos/shared.dto';

export enum RoleType {
	USER = 'USER',
	ADMIN = 'ADMIN',
}

export class UserDTO extends SharedDTO {
	@IsString()
	@IsNotEmpty()
	username!: string;

	@IsEmail()
	@IsNotEmpty()
	email!: string;

	@IsString()
	@IsNotEmpty()
	password!: string;

	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsString()
	@IsNotEmpty()
	lastname!: string;

	@IsNotEmpty()
	role!: RoleType;
}
