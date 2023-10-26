import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class SharedEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp' })
	createdAt!: Date;
	
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
	updatedAt!: Date;
}
