import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { UserModel } from './user.entity';

@Entity()
export class NotificationModel extends BaseModel {
  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  fromUserId: number;

  @ManyToOne(() => UserModel, (user) => user.notificationList, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: UserModel;
}
