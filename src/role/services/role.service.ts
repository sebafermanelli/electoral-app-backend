import { DeleteResult, UpdateResult } from 'typeorm';
import { SharedService } from '../../shared/service/shared.service';
import { RoleDTO } from '../dtos/role.dto';
import { RoleEntity } from '../entities/role.entity';

export class RoleService extends SharedService<RoleEntity> {
	constructor() {
		super(RoleEntity);
	}

	async findAllRoles(): Promise<RoleEntity[]> {
		return (await this.execRepository)
			.createQueryBuilder('role')
			.leftJoinAndSelect('role.election', 'election')
			.leftJoinAndSelect('role.candidates', 'candidates')
			.getMany();
	}

	async findRoleById(id: string): Promise<RoleEntity | null> {
		return (await this.execRepository)
			.createQueryBuilder('role')
			.leftJoinAndSelect('role.election', 'election')
			.leftJoinAndSelect('role.candidates', 'candidates')
			.where({ id })
			.getOne();
	}

	async findRoleByElectionAndOrder(election: string, order: number): Promise<RoleEntity | null> {
		return (await this.execRepository)
			.createQueryBuilder('role')
			.leftJoinAndSelect('role.election', 'election')
			.leftJoinAndSelect('role.candidates', 'candidates')
			.where({ election })
			.andWhere({ order })
			.getOne();
	}

	async findRolesByElection(election: string): Promise<RoleEntity[] | null> {
		return (await this.execRepository)
			.createQueryBuilder('role')
			.leftJoinAndSelect('role.election', 'election')
			.leftJoinAndSelect('role.candidates', 'candidates')
			.where({ election })
			.getMany();
	}

	async createRole(body: RoleDTO): Promise<RoleEntity> {
		return (await this.execRepository).save(body);
	}

	async deleteRole(id: string): Promise<DeleteResult> {
		return (await this.execRepository).delete({ id });
	}

	async updateRole(id: string, infoUpdate: RoleDTO): Promise<UpdateResult> {
		return (await this.execRepository).update(id, infoUpdate);
	}
}
