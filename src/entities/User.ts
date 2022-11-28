import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  manager_email: string;

  @Column()
  admission_date: Date;

  @Column({ nullable: true })
  resignation_date: Date;

  @Column()
  role: string;
}
