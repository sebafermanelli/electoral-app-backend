import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import nodemailer, { SendMailOptions, SentMessageInfo } from 'nodemailer';
import { AppDataSource } from './data.source';

export abstract class ConfigServer {
	constructor() {
		const nodeNameEnv = this.createPathEnv(this.nodeEnv);
		dotenv.config({
			path: nodeNameEnv,
		});
	}

	public getEnvironment(key: string): string | undefined {
		return process.env[key];
	}

	public getNumberEnvironment(key: string): number {
		return Number(this.getEnvironment(key));
	}

	public get nodeEnv(): string {
		return this.getEnvironment('NODE_ENV')?.trim() || '';
	}

	public createPathEnv(path: string): string {
		const arrEnv: string[] = ['env'];
		if (path.length > 0) {
			const stringToArray = path.split('.');
			arrEnv.unshift(...stringToArray);
		}
		return '.' + arrEnv.join('.');
	}

	get initConnect(): Promise<DataSource> {
		return AppDataSource.initialize();
	}

	public get nodeMailerConfig(): nodemailer.Transporter {
		return nodemailer.createTransport({
			service: this.getEnvironment('EMAIL_SERVICE'),
			secure: false,
			auth: {
				user: this.getEnvironment('EMAIL'),
				pass: this.getEnvironment('EMAIL_PASSWORD'),
			},
		});
	}

	async sendEmail({ to, subject, html }: SendMailOptions): Promise<SentMessageInfo> {
		try {
			const result = await this.nodeMailerConfig.sendMail({
				from: this.getEnvironment('EMAIL'),
				to,
				subject,
				html,
			});
			return result;
		} catch (error) {
			return error;
		}
	}
}
