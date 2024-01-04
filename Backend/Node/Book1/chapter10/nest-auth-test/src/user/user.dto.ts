import { IsEmail, IsString } from 'class-validator';

// 유저 생성 유효성 검증에 사용할 DTO
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;
}

// 업데이트 유효성 검증에 사용할 DTO
export class UpdateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
