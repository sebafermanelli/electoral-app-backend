import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'reflect-metadata';
import { ConfigServer } from './config/config';
import { DataSource } from 'typeorm';
import { UserRouter } from './user/user.router';
import { CandidateRouter } from './candidate/candidate.router';
import { DelegationRouter } from './delegation/delegation.router';
import { ElectionRouter } from './election/election.router';
import { VoteRouter } from './election/vote.router';
import { ListRouter } from './list/list.router';
import { RoleRouter } from './role/role.router';
import { VoterRouter } from './voter/voter.router';
import { LoginPassportStrategy } from './auth/strategies/login.strategy';
import { JwtPassportStrategy } from './auth/strategies/jwt.strategy';
import { AuthRouter } from './auth/auth.router';

export class Server extends ConfigServer {
	public app: express.Application = express();
	private port: number = this.getNumberEnvironment('PORT') || 8000;

	constructor() {
		super();
		this.listen();
		this.dbConnect();
		this.passportUse();
		this.midlewares();
		this.app.use('/api', this.routers());
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log(`Server running at port ${this.port}`);
		});
	}

	midlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(morgan('dev'));
	}

	routers(): express.Router[] {
		return [
			new UserRouter().router,
			new VoterRouter().router,
			new ElectionRouter().router,
			new VoteRouter().router,
			new DelegationRouter().router,
			new ListRouter().router,
			new RoleRouter().router,
			new CandidateRouter().router,
			new AuthRouter().router,
		];
	}

	passportUse() {
		return [new LoginPassportStrategy().use, new JwtPassportStrategy().use];
	}

	async dbConnect(): Promise<DataSource | void> {
		return this.initConnect
			.then(() => {
				console.log('Database connected');
			})
			.catch((error) => {
				console.error(error);
			});
	}
}

new Server();
