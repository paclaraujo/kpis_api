import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class InsertCsvDataIntoUSers1669650763363 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "status",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "name",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "manager_email",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "admission_date",
            type: "date",
            isNullable: false,
          },
          {
            name: "resignation_date",
            type: "date",
            isNullable: true,
          },
          {
            name: "role",
            type: "varchar",
            isNullable: false,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
