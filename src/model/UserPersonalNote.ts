import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('user_personal_note')
class UserPersonalNote {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    owner_of_the_note_id!: string;

    @Column()
    note!: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at!: Date;
}

export default UserPersonalNote;
