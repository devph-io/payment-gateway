import { MigrationInterface, QueryRunner } from 'typeorm';

export class addPhotoAndIsConfirmed1594631955285 implements MigrationInterface {
  name = 'addPhotoAndIsConfirmed1594631955285';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "photo" character varying`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "is_confirmed" boolean DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_confirmed"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "photo"`);
  }
}
