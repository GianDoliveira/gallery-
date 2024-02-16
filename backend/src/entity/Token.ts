import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { User } from './User';

@Entity({ name: 'invalid_token' })
export class InvalidToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @ManyToOne(() => User, user => user.invalidToken)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
