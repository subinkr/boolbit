import { ApiProperty } from '@nestjs/swagger';
import { MockBaseModel } from 'src/_mock/entities/base.entity';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseModel {
  @ApiProperty({ example: MockBaseModel.defaultBase.id, required: false })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: MockBaseModel.defaultBase.createdAt,
    required: false,
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: MockBaseModel.defaultBase.updatedAt,
    required: false,
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    example: MockBaseModel.defaultBase.deletedAt,
    required: false,
  })
  @DeleteDateColumn()
  deletedAt: Date;
}
