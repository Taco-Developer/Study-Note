import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '../user.entity';

// Express에 있는 Request 객체에 currentUser 속성으로 User Entity Instance가 올 수 있음을 표시
declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

// 의존성 주입 사용
@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // 세션 객체가 없는 경우 처리
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findOne(userId);
      // Express로 정의된 Request 객체를 사용하기 때문에 타입 에러 발생
      // Request 객체에 currentUser 속성이 없기 때문 => Request 객체에 currentUser가 포함될 수 있다고 표시하기
      req.currentUser = user;
    }

    // 다음 미들웨어 실행
    next();
  }
}
