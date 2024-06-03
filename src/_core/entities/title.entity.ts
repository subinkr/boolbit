import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from './base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { UserModel } from './user.entity';

@Entity()
export class TitleModel extends BaseModel {
  @ApiProperty({ example: 'title' })
  @Column()
  name: string;

  @ApiProperty({ example: '0xFF123123' })
  @Column()
  color: string;

  @ApiProperty({
    example: [],
    required: false,
  })
  @ManyToMany(() => UserModel, (user) => user.titleList)
  @JoinTable({ name: 'title_user_model' })
  userList: Promise<UserModel[]>;
}
