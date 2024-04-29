import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // 로그인하지 않은 경우
    if (!request.currentUser) return false;

    // admin값에 따라 반환
    return request.currentUser.admin;
  }
}
