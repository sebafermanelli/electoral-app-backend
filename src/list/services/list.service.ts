import { DeleteResult, UpdateResult } from 'typeorm';
import { SharedService } from '../../shared/service/shared.service';
import { ListDTO } from '../dtos/list.dto';
import { ListEntity } from '../entities/list.entity';

export class ListService extends SharedService<ListEntity> {
	constructor() {
		super(ListEntity);
	}

	async findAllLists(): Promise<ListEntity[]> {
		return (await this.execRepository)
			.createQueryBuilder('list')
			.leftJoinAndSelect('list.election', 'election')
			.leftJoinAndSelect('list.candidates', 'candidates')
			.getMany();
	}

	async findListById(id: string): Promise<ListEntity | null> {
		return (await this.execRepository)
			.createQueryBuilder('list')
			.leftJoinAndSelect('list.election', 'election')
			.leftJoinAndSelect('list.candidates', 'candidates')
			.where({ id })
			.getOne();
	}

	async createList(body: ListDTO): Promise<ListEntity> {
		return (await this.execRepository).save(body);
	}

	async deleteList(id: string): Promise<DeleteResult> {
		return (await this.execRepository).delete({ id });
	}

	async updateList(id: string, infoUpdate: ListDTO): Promise<UpdateResult> {
		return (await this.execRepository).update(id, infoUpdate);
	}
}
