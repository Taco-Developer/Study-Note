import { User } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: false,
  })
  approved: boolean;

  @Column()
  price: number;

  @Column()
  make: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @Column()
  mileage: number;

  // ManyToOne은 데이터베이스 내부에 변경을 초래함
  // Reports 테이블에 TypeORM이 자동으로 새 열을 추가함
  // 보고서를 사용자와 연결
  @ManyToOne(() => User, (user) => user.reports)
  user: User;
}
