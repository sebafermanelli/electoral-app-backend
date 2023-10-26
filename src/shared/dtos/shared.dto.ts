import { IsDate, IsOptional, IsUUID } from "class-validator";

export abstract class SharedDTO {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsDate()
  @IsOptional()
  createdAt?: Date;
  
  @IsDate()
  @IsOptional()
  updatedAt?: Date;
}