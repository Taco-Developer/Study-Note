import { Report } from 'src/reports/report.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // 테스트를 위해 모든 유저의 기본값을 true로 설정
  @Column({ default: true })
  admin: boolean;

  // OneToMany는 데이터베이스에 변경을 초래하지 않음
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
