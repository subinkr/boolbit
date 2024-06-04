import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { ChatModel } from './chat.entity';
import { UserModel } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class RoomModel extends BaseModel {
  @ApiProperty({ example: 'name', required: false })
  @Column()
  name: string;

  @ApiProperty({ example: 'content', required: false })
  @Column({ default: '' })
  lastChat: string;

  @ApiProperty({ example: [], required: false })
  @OneToMany(() => ChatModel, (chat) => chat.room)
  chatList: Promise<ChatModel[]>;

  @ApiProperty({ example: [], required: false })
  @ManyToMany(() => UserModel, (user) => user.roomList, {
    eager: true,
  })
  userList: UserModel[];

  //   @ApiProperty({ example: [], required: false })
  //   @ManyToMany(() => UserModel, (user) => user.viewRoomList, { eager: true })
  //   viewUserList: UserModel[];
}
