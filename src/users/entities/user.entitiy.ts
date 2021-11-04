import { CoreEntity } from 'src/core/entities/core.entitiy';
import { Column, Entity } from 'typeorm';

enum UserRole {
  user,
  admin,
}

@Entity()
export class User extends CoreEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
}
