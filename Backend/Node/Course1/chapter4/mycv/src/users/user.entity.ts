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
// import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // 인스턴스를 일반 객체로 바꾸고 JSON으로 변환할 때 비밀번호를 제외함
  @Column()
  // @Exclude는 해당 속성을 포함하지 말라는 의미
  // @Exclude()
  password: string;

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
