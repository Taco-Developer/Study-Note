import { Controller, Get } from '@nestjs/common';

// 컨트롤러 데코레이터
@Controller()
export class HelloController {
  // GET 요청 처리 데코레이터
  @Get()
  hello() {
    return '안녕하세요! NextJS로 만든 첫 애플리케이션입니다.';
  }
}
