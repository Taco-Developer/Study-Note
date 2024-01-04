import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';

// 의존성 주입을 위한 데코레이터
@Injectable()
export class UserService {
  constructor(
    // 리포지토리 주입
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  //   유저 생성
  createUser(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  //   한 명의 유저 찾기
  async getUser(email: string) {
    const result = await this.userRepository.findOne({ where: { email } });
    return result;
  }

  // 유저 정보 업데이트
  async updateUser(email: string, _user: UpdateUserDto) {
    const user: User = await this.getUser(email);
    console.log(_user);
    user.username = _user.username;
    user.password = _user.password;
    console.log(user);
    this.userRepository.save(user);
  }

  // 유저 정보 삭제
  deleteUser(email: string) {
    return this.userRepository.delete({ email });
  }
}
