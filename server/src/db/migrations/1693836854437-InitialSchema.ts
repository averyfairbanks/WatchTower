import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1693836854437 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            CREATE TABLE IF NOT EXISTS users (
                id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(128) NOT NULL
            );
                
            CREATE TABLE IF NOT EXISTS user_meal (
                id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                user_id BIGINT NOT NULL,
                name VARCHAR(128) NOT NULL,
                description VARCHAR(512),
                photo_url VARCHAR(512),
                time_logged TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                notified BOOLEAN DEFAULT false
            );
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
