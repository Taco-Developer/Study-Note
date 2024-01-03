import { Controller, Get } from '@nestjs/common';

// ConfigService
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  // ConfigService 주입
  constructor(private configService: ConfigService) {}

  @Get()
  getHello(): string {
    // configService.get() 호출
    const message = this.configService.get('MESSAGE');
    return message;
  }

  @Get('service-url')
  getServiceUrl(): string {
    // SERVICE_URL 환경 변수 반환
    return this.configService.get('SERVICE_URL');
  }

  @Get('db-info')
  getTest(): string {
    // logLevel 터미널 출력
    console.log(this.configService.get('logLevel'));
    // apiVerioin 터미널 출력
    console.log(this.configService.get('apiVersion'));
    // dbInfo 반환
    return this.configService.get('dbInfo');
  }

  @Get('redis-info')
  getRedisInfo(): string {
    return `${this.configService.get('redis.host')}:${this.configService.get(
      'redis.port',
    )}`;
  }

  @Get('server-url')
  getServerUrl(): string {
    return this.configService.get('SERVER_URL');
  }
}
