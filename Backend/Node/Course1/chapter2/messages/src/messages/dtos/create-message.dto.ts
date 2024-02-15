import { IsString } from 'class-validator';

export class CreateMessageDto {
  // @IsString() CreateMessageDto 인스턴스를 생성할 때마다 content 속성이 실제로 문자열인지 확인
  @IsString()
  content: string;
}
