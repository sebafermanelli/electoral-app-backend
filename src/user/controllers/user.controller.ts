import { Request, Response } from 'express';
import { HttpResponse } from '../../shared/response/http.response';
import { UserService } from '../services/user.service';
import { VoterService } from '../../voter/services/voter.service';
import { VoterDTO } from '../../voter/dtos/voter.dto';

export class UserController {
	constructor(
		private readonly httpResponse: HttpResponse = new HttpResponse(),
		private readonly userService: UserService = new UserService(),
		private readonly voterService: VoterService = new VoterService()
	) {}

	async getAllUsers(req: Request, res: Response) {
		try {
			const data = await this.userService.findAllUsers();
			if (data.length === 0) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async getUserById(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.userService.findUserById(id);
			if (!data) {
				return this.httpResponse.NotFound(res, 'No existe dato');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async createUser(req: Request, res: Response) {
		const { username, email } = req.body;
		try {
			const userByUsername = await this.userService.findUserByUsername(username);
			if (userByUsername) {
				return this.httpResponse.Error(res, 'El usuario ya existe');
			}
			const userByEmail = await this.userService.findUserByEmail(email);
			if (userByEmail) {
				return this.httpResponse.Error(res, 'El email ya existe');
			}
			const data = await this.userService.createUser(req.body);
			const voter: VoterDTO = {
				user: data,
			};
			await this.voterService.createVoter(voter);
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async deleteUser(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.userService.deleteUser(id);
			if (!data.affected) {
				return this.httpResponse.NotFound(res, 'Hay un error en borrar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async updateUser(req: Request, res: Response) {
		const { id } = req.params;
		try {
			const data = await this.userService.updateUser(id, req.body);
			if (!data.affected) {
				return this.httpResponse.NotFound(res, 'Hay un error en actualizar');
			}
			return this.httpResponse.Ok(res, data);
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}

	async genCode(req: Request, res: Response) {
		const { username } = req.params;
		try {
			const userByUsername = await this.userService.findUserByUsername(username);
			const userByEmail = await this.userService.findUserByEmail(username);
			if (!userByUsername && !userByEmail) {
				return this.httpResponse.NotFound(res, 'El usuario no existe');
			}
			if (userByUsername) {
				const data = await this.userService.genPasswordUser(userByUsername.id);
				if (!data) {
					return this.httpResponse.NotFound(res, 'Hay un error en generar el codigo');
				}
			}
			if (userByEmail) {
				const data = await this.userService.genPasswordUser(userByEmail.id);
				if (!data) {
					return this.httpResponse.NotFound(res, 'Hay un error en generar el codigo');
				}
			}
			return this.httpResponse.Ok(res, 'Codigo enviado correctamente');
		} catch (error) {
			return this.httpResponse.Error(res, error);
		}
	}
}
