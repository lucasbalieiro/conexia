import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User'

@Entity('user_personal_note')
class UserPersonalNote {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_of_the_note_id' })
  owner_of_the_note_id!: User;

  @Column()
  note!: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at!: Date;
}

export default UserPersonalNote;
