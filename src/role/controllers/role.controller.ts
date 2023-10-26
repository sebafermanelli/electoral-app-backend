import { Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { RoleService } from '../services/role.service';
import { ElectionService } from '../../election/services/election.service';

export class RoleController {
	constructor(
		private readonly httpResponse: HttpResponse = new HttpResponse(),
		private readonly roleService: RoleService = new RoleService(),
		private readonly electionService: ElectionService = new ElectionService()
	) {}

	async getAllRoles(req: Request, res: Response) {
		try {
			const data = await this.roleService.findAllRoles();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getRoleById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.roleService.findRoleById(id);
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async createRole(req: Request, res: Response) {
		const { election, order } = req.body;
		try {
			const electionExist = await this.electionService.findElectionById(election);
			if (!electionExist) {
				return this.httpResponse.NotFound(res, 'La eleccion no existe');
			}
			const roleExist = await this.roleService.findRoleByElectionAndOrder(election, order);
			if (roleExist) {
				return this.httpResponse.Error(res, 'El orden del rol en la eleccion ya existe');
			}
			const data = await this.roleService.createRole(req.body);
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteRole(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.roleService.deleteRole(id);
			if (!data.affected) {
				return this.httpResponse.NotFound(res, 'Hay un error en borrar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async updateRole(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.roleService.updateRole(id, req.body);
			if (!data.affected) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}
}
