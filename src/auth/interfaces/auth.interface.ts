import { RoleType } from '../../user/dtos/user.dto';

export interface PayloadToken {
	role: RoleType;
	sub: string;
}
