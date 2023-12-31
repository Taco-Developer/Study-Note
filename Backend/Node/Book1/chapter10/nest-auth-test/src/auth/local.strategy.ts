import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // PassportStrategy 믹스인
  constructor(private authService: AuthService) {
    // 기본값이 username이므로 email로 변경
    super({ usernameField: 'email' });
  }

  //   유저 정보 유효성 검증
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);

    // null 이면 401 에러 발생
    if (!user) {
      return null;
    }

    // null이 아니면 user 정보 반환
    return user;
  }
}
