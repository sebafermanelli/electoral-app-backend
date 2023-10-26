import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { ConfigServer } from '../../config/config';
import { SharedEntity } from '../entities/shared.entity';

export class SharedService<T extends SharedEntity> extends ConfigServer {
	public execRepository: Promise<Repository<T>>;

	constructor(private getEntity: EntityTarget<T>) {
		super();
		this.execRepository = this.initRepository(getEntity);
	}

	async initRepository<T extends ObjectLiteral>(entity: EntityTarget<T>): Promise<Repository<T>> {
		const getDataSource = await this.initConnect;
		return getDataSource.getRepository(entity);
	}
}
