import { Controller, Get } from '@nestjs/common';

// ConfigService
import { ConfigService } from '@nestjs/config';

@Controller('weather')
export class WeatherController {
  // 의존성 주입
  constructor(private configService: ConfigService) {}

  @Get()
  getWeather(): string {
    // 환경 변수값 가져오기
    const apiUrl = this.configService.get('WEATHER_API_URL');
    const apiKey = this.configService.get('WEATHER_API_KEY');

    // 내부 함수 callWeatherApi 호출
    return this.callWeatherApi(apiUrl, apiKey);
  }

  private callWeatherApi(apiUrl: string, apiKey: string) {
    console.log(apiUrl);
    console.log(apiKey);

    return '맑음';
  }
}
