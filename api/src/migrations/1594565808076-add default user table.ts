import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDefaultUserTable1594565808076 implements MigrationInterface {
  name = 'addDefaultUserTable1594565808076';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "revoked_token" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "disabled" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, "token" character varying NOT NULL, CONSTRAINT "UQ_f5e26d352b9ac8dfdf81376da03" UNIQUE ("uuid"), CONSTRAINT "UQ_572b4c3824a800e4341ee43fcee" UNIQUE ("token"), CONSTRAINT "PK_bf300a6daf55d675aba672ba1f7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "disabled" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, "auth" character varying, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "reset_password_code" uuid, "account_activation_code" uuid, "fullname" character varying, "primary_address" jsonb DEFAULT '{}', "secondary_address" jsonb DEFAULT '{}', "birth_date" date, "mobile_number" character varying, "permissions" jsonb DEFAULT '{}', CONSTRAINT "UQ_a95e949168be7b7ece1a2382fed" UNIQUE ("uuid"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_d04c3c96994f2f7056535ad375" ON "user" ("auth") WHERE auth IS NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_5c39e50a5b967aed2726040110" ON "user" ("reset_password_code") WHERE reset_password_code IS NOT NULL`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_1b94d2ab9a1a78bd818735617b" ON "user" ("account_activation_code") WHERE account_activation_code IS NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_1b94d2ab9a1a78bd818735617b"`);
    await queryRunner.query(`DROP INDEX "IDX_5c39e50a5b967aed2726040110"`);
    await queryRunner.query(`DROP INDEX "IDX_d04c3c96994f2f7056535ad375"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "revoked_token"`);
  }
}
