import { User } from "../entities/User";
import { AppDataSource } from "../infra/database";

export default class UserRepository {
  static async findByEmail(email: string) {
    return await AppDataSource.getRepository(User).findOneBy({ email });
  }

  static async findById(id: number) {
    return await AppDataSource.getRepository(User).findOneBy({ id });
  }

  static async findSubordinates(id: number) {
    return await AppDataSource.getRepository(User).query(
      `WITH RECURSIVE subordinates AS (SELECT * FROM public.user WHERE id=${id} UNION ALL SELECT  e.* FROM public.user INNER JOIN subordinates o ON o.email = e.manager_email) SELECT * FROM subordinates;`
    );
  }
}
