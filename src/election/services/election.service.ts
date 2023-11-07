import { DeleteResult, UpdateResult } from 'typeorm';
import { SharedService } from '../../shared/service/shared.service';
import { ElectionDTO } from '../dtos/election.dto';
import { ElectionEntity } from '../entities/election.entity';
import { CandidateService } from '../../candidate/services/candidate.service';
import { CandidateDTO } from '../../candidate/dtos/candidate.dto';

export class ElectionService extends SharedService<ElectionEntity> {
	constructor(private readonly candidateService: CandidateService = new CandidateService()) {
		super(ElectionEntity);
	}

	async findAllElections(): Promise<ElectionEntity[]> {
		return (await this.execRepository)
			.createQueryBuilder('election')
			.leftJoinAndSelect('election.delegation', 'delegation')
			.leftJoinAndSelect('delegation.candidates', 'candidatesDelegation')
			.leftJoinAndSelect('candidatesDelegation.role', 'roleDelegation')
			.leftJoinAndSelect('candidatesDelegation.list', 'listDelegation')
			.leftJoinAndSelect('candidatesDelegation.voter', 'voterDelegation')
			.leftJoinAndSelect('voterDelegation.user', 'userDelegation')
			.leftJoinAndSelect('election.roles', 'roles')
			.leftJoinAndSelect('roles.candidates', 'candidatesRoles')
			.leftJoinAndSelect('candidatesRoles.voter', 'voterRoles')
			.leftJoinAndSelect('voterRoles.user', 'userRoles')
			.leftJoinAndSelect('election.lists', 'lists')
			.leftJoinAndSelect('lists.candidates', 'candidatesLists')
			.leftJoinAndSelect('candidatesLists.voter', 'voterLists')
			.leftJoinAndSelect('voterLists.user', 'userLists')
			.leftJoinAndSelect('election.votes', 'votes')
			.orderBy('roles.order', 'ASC')
			.addOrderBy('lists.votes', 'DESC')
			.getMany();
	}

	async findElectionById(id: string): Promise<ElectionEntity | null> {
		return (await this.execRepository)
			.createQueryBuilder('election')
			.leftJoinAndSelect('election.delegation', 'delegation')
			.leftJoinAndSelect('delegation.candidates', 'candidatesDelegation')
			.leftJoinAndSelect('candidatesDelegation.role', 'roleDelegation')
			.leftJoinAndSelect('candidatesDelegation.list', 'listDelegation')
			.leftJoinAndSelect('candidatesDelegation.voter', 'voterDelegation')
			.leftJoinAndSelect('voterDelegation.user', 'userDelegation')
			.leftJoinAndSelect('election.roles', 'roles')
			.leftJoinAndSelect('roles.candidates', 'candidatesRoles')
			.leftJoinAndSelect('candidatesRoles.voter', 'voterRoles')
			.leftJoinAndSelect('voterRoles.user', 'userRoles')
			.leftJoinAndSelect('election.lists', 'lists')
			.leftJoinAndSelect('lists.candidates', 'candidatesLists')
			.leftJoinAndSelect('candidatesLists.voter', 'voterLists')
			.leftJoinAndSelect('voterLists.user', 'userLists')
			.leftJoinAndSelect('election.votes', 'votes')
			.where({ id })
			.orderBy('roles.order', 'ASC')
			.addOrderBy('lists.votes', 'DESC')
			.getOne();
	}

	async createElection(body: ElectionDTO): Promise<ElectionEntity> {
		return (await this.execRepository).save(body);
	}

	async deleteElection(id: string): Promise<DeleteResult> {
		return (await this.execRepository).delete({ id });
	}

	async updateElection(id: string, infoUpdate: ElectionDTO): Promise<UpdateResult> {
		return (await this.execRepository).update(id, infoUpdate);
	}

	async genResultsElection(election: ElectionEntity): Promise<UpdateResult> {
		// Creo un arreglo de las listas con un atributo asignatedPos inicializado en 1 para que si posee algun cargo con rol que deba ser mediante el sistema Dhondt, el mismo vaya incrementandose a medida que se asignan los cargos
		const lists = election.lists.map((list) => {
			const newList = { ...list, asignatedPos: 1 };
			return newList;
		});
		// Se recorre cada rol para todas las listas y asi buscar el candidato ganador
		election.roles.map(async (role) => {
			// Si el rol es mediante el sistema Dhondt se cumple la siguiente logica:
			if (role.dhondt) {
				let maxQuotient = -Infinity;
				// Obtengo la lista del candidato ganador a travez de Dhondt
				const winnerList = lists.reduce((maxList, list) => {
					const quotient = list.votes / list.asignatedPos;
					if (quotient > maxQuotient && list.candidates.length > 0) {
						maxQuotient = quotient;
						return list;
					} else {
						return maxList;
					}
				});
				// Incremento en 1 los puestos asignados a la lista ganadora del cargo
				lists.map((list) => {
					winnerList == list ? list.asignatedPos++ : null;
				});
				// Busco el candidato segun el rol y lista especificado
				let candidate = await this.candidateService.findCandidateByListAndRole(
					winnerList.id,
					role.id
				);
				// Asigno la delegacion al candidato ganador mediante el sistema Dhondt
				if (candidate) {
					const updatedCandidate: CandidateDTO = {
						voter: candidate.voter,
						role: candidate.role,
						list: candidate.list,
						delegation: election.delegation,
					};
					await this.candidateService.updateCandidate(candidate.id, updatedCandidate);
				}
			}
			// Si el rol no es mediante el sistema Dhondt se cumple la siguiente logica:
			else {
				// Obtengo la lista del candidato ganador por cantidad de votos a la lista
				const winnerList = lists.reduce((maxList, list) => {
					if (list.votes > maxList.votes && list.candidates.length > 0) {
						return list;
					} else {
						return maxList;
					}
				});
				// Busco el candidato segun el rol y lista especificado
				let candidate = await this.candidateService.findCandidateByListAndRole(
					winnerList.id,
					role.id
				);
				// Asigno la delegacion al candidato ganador por cantidad de votos a la lista
				if (candidate) {
					const updatedCandidate: CandidateDTO = {
						voter: candidate.voter,
						role: candidate.role,
						list: candidate.list,
						delegation: election.delegation,
					};
					await this.candidateService.updateCandidate(candidate.id, updatedCandidate);
				}
			}
		});
		const updatedElection: ElectionDTO = {
			name: election.name,
			startDate: election.startDate,
			endDate: new Date(),
		};
		return (await this.execRepository).update(election.id, updatedElection);
	}
}
