import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

export default class UserPersonalNotes1614307365160 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'personal_notes',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          generationStrategy: 'uuid',
        },
        {
          name: 'owner_of_the_note_id',
          type: 'varchar',
        },
        {
          name: 'note',
          type: 'text',
        },
        {
          name: 'created_at',
          type: 'timestamp',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'timestamp',
          default: 'now()',
        },
      ],
    }));

    await queryRunner.createForeignKey('personal_notes', new TableForeignKey({
      name: 'FK_user_personal_notes',
      columnNames: ['owner_of_the_note_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('personal_notes', 'FK_user_personal_notes');
    await queryRunner.dropTable('personal_notes');
  }
}
