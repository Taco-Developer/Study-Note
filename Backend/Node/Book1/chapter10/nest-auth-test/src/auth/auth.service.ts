import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

// 프로바이더로 사용
@Injectable()
export class AuthService {
  // 생성자에서 유저 서비스 주입받음
  constructor(private userService: UserService) {}

  async register(userDto: CreateUserDto) {
    // 이미 가입된 유저가 있는지 확인
    const user = await this.userService.getUser(userDto.email);

    // 이미 가입된 유저가 있으면 에러 발생
    if (user) {
      throw new HttpException('해당 유저가 있습니다.', HttpStatus.BAD_REQUEST);
    }

    // 패스워드 암호화
    const encryptedPassword = bcrypt.hashSync(userDto.password, 10);

    // 데이터베이스 저장, 저장 중 에러가 나면 서버 에러 발생
    try {
      const user = await this.userService.createUser({
        ...userDto,
        password: encryptedPassword,
      });
      // 회원 가입 후 반환값에 password 주지 않음
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('서버 에러', 500);
    }
  }

  async validateUser(email: string, password: string) {
    // 이메일로 유저 정보 받기
    const user = await this.userService.getUser(email);

    // 유저가 없으면 검증 실패
    if (!user) {
      return null;
    }

    // 패스워드를 따로 뽑음
    const { password: hashedPassword, ...userInfo } = user;
    // 패스워드가 일치하면 성공
    if (bcrypt.compareSync(password, hashedPassword)) {
      return userInfo;
    }

    return null;
  }
}
