import { Column, Entity } from 'typeorm';
import { CoreEntity } from 'src/core/entities/core.entity';

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

  @Column()
  role: UserRole;
}
