import { DeleteResult, UpdateResult } from 'typeorm';
import { SharedService } from '../../shared/service/shared.service';
import { RoleType, UserDTO } from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

export class UserService extends SharedService<UserEntity> {
	constructor() {
		super(UserEntity);
	}

	async findAllUsers(): Promise<UserEntity[]> {
		return (await this.execRepository)
			.createQueryBuilder('user')
			.leftJoinAndSelect('user.voter', 'voter')
			.getMany();
	}

	async findUserById(id: string): Promise<UserEntity | null> {
		return (await this.execRepository)
			.createQueryBuilder('user')
			.leftJoinAndSelect('user.voter', 'voter')
			.where({ id })
			.getOne();
	}

	async findUserByIdAndRole(id: string, role: RoleType): Promise<UserEntity | null> {
		return (await this.execRepository)
			.createQueryBuilder('user')
			.addSelect('user.password')
			.leftJoinAndSelect('user.voter', 'voter')
			.where({ id })
			.andWhere({ role })
			.getOne();
	}

	async findUserByUsername(username: string): Promise<UserEntity | null> {
		return (await this.execRepository)
			.createQueryBuilder('user')
			.addSelect('user.password')
			.leftJoinAndSelect('user.voter', 'voter')
			.where({ username })
			.getOne();
	}

	async findUserByEmail(email: string): Promise<UserEntity | null> {
		return (await this.execRepository)
			.createQueryBuilder('user')
			.addSelect('user.password')
			.leftJoinAndSelect('user.voter', 'voter')
			.where({ email })
			.getOne();
	}

	async createUser(body: UserDTO): Promise<UserEntity> {
		const newUser = await (await this.execRepository).create(body);
		const hashPass = await bcrypt.hash(newUser.password, 10);
		newUser.password = hashPass;
		return (await this.execRepository).save(newUser);
	}

	async deleteUser(id: string): Promise<DeleteResult> {
		return (await this.execRepository).delete({ id });
	}

	async updateUser(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
		const hashPass = await bcrypt.hash(infoUpdate.password, 10);
		infoUpdate.password = hashPass;
		return (await this.execRepository).update(id, infoUpdate);
	}

	async genPasswordUser(id: string): Promise<UserEntity> {
		const user = await (await this.execRepository).findOneBy({ id });
		let randomCode = '';
		for (let i = 0; i < 6; i++) {
			const number = Math.floor(Math.random() * 10);
			randomCode += number;
		}
		const hashPass = await bcrypt.hash(randomCode, 10);
		user!.password = hashPass;
		this.sendEmail({
			to: user!.email,
			subject: 'Codigo de ingreso',
			html: `El codigo para ingresar al sistema de voto electronico es: ${randomCode}`,
		});
		const data = await (await this.execRepository).save(user!);
		data.password = 'Not permission';
		return data;
	}
}
