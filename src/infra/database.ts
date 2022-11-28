import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";

import { User } from "../entities/User";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: ["src/migrations/**/*.ts"],
});

export const connectDb = async () => {
  try {
    await AppDataSource.initialize();
    console.log("🐘 Connected to database.");
  } catch (error) {
    console.log(error);
  }
};
