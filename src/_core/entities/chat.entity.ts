import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { UserModel } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { RoomModel } from './room.entity';
import { MockChatModel } from 'src/_mock/entities/chat.entity';

@Entity()
export class ChatModel extends BaseModel {
  @ApiProperty({ example: 'content', required: false })
  @Column()
  content: string;

  @ApiProperty({ example: [], required: false })
  @ManyToOne(() => RoomModel, (room) => room.chatList, {
    onDelete: 'CASCADE',
    eager: true,
  })
  room: RoomModel;

  @ApiProperty({ example: MockChatModel.defaultChat.user, required: false })
  @ManyToOne(() => UserModel, (user) => user.chatList, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: UserModel;
}
