import { Users } from "../entities/Users";
import { AppDataSource } from "../infra/database";

export default class UserRepository {
  static async findByEmail(email: string) {
    return await AppDataSource.getRepository(Users).findOneBy({ email });
  }

  static async findById(id: number) {
    return await AppDataSource.getRepository(Users).findOneBy({ id });
  }

  static async findSubordinates(id: number) {
    return await AppDataSource.getRepository(Users).query(
      `WITH RECURSIVE subordinates AS (
        SELECT       
          *
        FROM       
          users
        WHERE id=${id}
        UNION ALL
        SELECT 
          e.*
        FROM 
          users e
          INNER JOIN subordinates o 
          ON o.email = e.manager_email
        )
      SELECT * FROM subordinates 
      ORDER BY admission_date ASC
      ;`
    );
  }
}
