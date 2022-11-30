import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterDatabaseDateFormat1669650562860
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER DATABASE kpis_api SET datestyle TO 'ISO, DMY'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER DATABASE kpis_api SET datestyle TO 'ISO, YMD'`
    );
  }
}
