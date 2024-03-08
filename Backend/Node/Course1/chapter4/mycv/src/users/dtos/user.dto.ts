import { Expose } from 'class-transformer';

export class UserDto {
  // @Expose는 해당 속성을 공유(포함)하라는 의미
  @Expose()
  id: number;

  @Expose()
  email: string;
}
