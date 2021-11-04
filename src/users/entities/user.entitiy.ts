import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum UserRole {
  user,
  admin,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column()
  createdAt: Date;
}
