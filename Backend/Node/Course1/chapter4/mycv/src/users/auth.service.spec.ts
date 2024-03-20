import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // 회원 정보 메모리에 저장
    const users: User[] = [];

    // Create a fake copy of the users service.
    // fakeUsersService는 UsersService의 일부이므로 Partical<UsersService> 타입 지정
    // AuthService는 find와 create 메서드만 사용하므로 두 메서드만 구현
    fakeUsersService = {
      // UserService의 find와 create가 비동기적이므로 Promise.resolve 반환
      find: (email: string) => {
        const filterdUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filterdUsers);
      },
      create: (email: string, password: string) =>
        // create => User 엔티티를 반환하므로 as User를 통해 User 엔티티로 취급
        // Promise.resolve({ id: 1, email, password } as User)
        {
          const user = {
            id: Math.floor(Math.random() * 99999),
            email,
            password,
          } as User;
          users.push(user);
          return Promise.resolve(user);
        },
    };

    // 테스트용 DI 컨테이너 생성
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    // 서비스 생성
    service = module.get(AuthService);
  });

  // 서비스 생성 확인
  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  // 비밀번호 해시 처리 확인
  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('asdf@test.com', 'asdf');
    // 입력된 비밀번호와 저장된 비밀번호가 다름
    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    // 비밀번호를 .으로 구분하면 salt와 hash로 구분할 수 있음
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  // 이메일 중복 확인
  it('thorws an error if user signs up with email that is in use', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     { id: 1, email: 'sdfsd@sdf.sdf', password: 'asdf' } as User,
    //   ]);

    // fakeUsersService를 좀 더 현실적으로 수정 후 테스트
    await service.signup('asdf@asdf.com', 'asdf');

    // 이메일 중복으로 예외 발생
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

  // 없는 이메일로 로그인 확인
  it('throws an error if signin is called with an unused email', async () => {
    await expect(service.signin('asdf@asdf.asdf', 'asdf')).rejects.toThrow(
      NotFoundException,
    );
  });

  // 잘못된 비밀번호 입력 확인
  it('throws if an invalid password is provided', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     { email: 'asdf@asdf.com', password: 'asdfasd' } as User,
    //   ]);

    // fakeUsersService를 좀 더 현실적으로 수정 후 테스트
    await service.signup('asdf@asdf.com', 'invalidPassword');

    await expect(service.signin('asdf@asdf.com', 'password')).rejects.toThrow(
      BadRequestException,
    );
  });

  // 올바른 비밀번호 입력 확인
  it('returns a user if a correct password is provided', async () => {
    // // 하나의 유저를 생성한 후 그 유저로 로그인해서 확인
    // const user = await service.signup('asdf@asdf.com', 'mypassword');
    // // 임시로 만든 유저 반환
    // fakeUsersService.find = () => Promise.resolve([user]);
    // // 임시로 만든 유저로 로그인(올바른 비밀번호)
    // const signinUser = await service.signin('asdf@asdf.com', 'mypassword');
    // expect(signinUser).toBeDefined();

    // fakeUsersService를 좀 더 현실적으로 수정 후 테스트
    await service.signup('asdf@asdf.com', 'mypassword');
    const user = await service.signin('asdf@asdf.com', 'mypassword');
    expect(user).toBeDefined();
  });
});
