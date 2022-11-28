import { MigrationInterface, QueryRunner } from "typeorm";

import { csvData } from "../helpers/parseCsvFile";

export class InsertCsvDataIntoUSers1669651832032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `INSERT INTO public.user (id, status, name, email, manager_email, admission_date, resignation_date, role) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

    for (let row of csvData) {
      const csvRowFormated = Array.from(row, (item) =>
        item === "" ? null : item
      );
      await queryRunner.manager.query(query, csvRowFormated);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE public.user`);
  }
}
