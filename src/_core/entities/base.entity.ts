import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
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
  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @ApiProperty({
    example: MockBaseModel.defaultBase.updatedAt,
    required: false,
  })
  @UpdateDateColumn()
  @Exclude({ toPlainOnly: true })
  updatedAt: Date;

  @ApiProperty({
    example: MockBaseModel.defaultBase.deletedAt,
    required: false,
  })
  @DeleteDateColumn()
  @Exclude({ toPlainOnly: true })
  deletedAt: Date;
}
