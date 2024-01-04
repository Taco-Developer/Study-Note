import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// 엔티티 객체임을 알려주기 위한 데코레이터
@Entity()
export class User {
  // id는 pk이며 자동으로 증가하는 값
  @PrimaryGeneratedColumn()
  id?: number;

  // email은 유니크한 값
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  // 기본값을 넣어줌
  createdAt: Date = new Date();
}
