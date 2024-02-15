import { Controller, Get } from '@nestjs/common';

/**
 * Controller 데코레이터는 애플리케이션 안에서 컨트롤러 역할을 하는
 * 클래스를 생성한다고 NestJS에 알려줌
 */
@Controller('/app')
// 유입되는 요청을 처리하고 라우팅
export class AppController {
  // 각각의 메서드는 유입되는 요청을 종류별로 하나씩 처리
  // 애플리케이션에 경로를 추가하고 싶은 경우 메서드를 추가

  // 루트 경로에 대한 GET 요청을 처리하고 싶은 경우
  // Get 데코레이터를 써서 HTTP GET 요청에 대응하는 라우트 핸들러 생성
  @Get('/asdf')
  getRootRoute() {
    return 'hi there!';
  }

  @Get('/bye')
  getByeThere() {
    return 'bye there!';
  }
}
