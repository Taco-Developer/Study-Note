import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) =>
        Promise.resolve({
          id,
          email: 'asdf@asdf.com',
          password: 'asdf',
        } as User),

      find: (email: string) =>
        Promise.resolve([{ id: 1, email, password: 'asdf' } as User]),

      // remove: (id: number) => {},
      // update: (id, attrs) => {},
    };
    fakeAuthService = {
      // signup: (email, password) => {},
      signin: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // findAllUsers 테스트 => 테스트의 이점이 없음
  // 컨트롤러 메서드는 데코레이터 관련 내용이 없다면 논리가 별로 없음
  // 컨트롤러는 최대한 간단하고 기본적이어야 함 => 논리가 많아선 안 됨
  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAllUsers('asdf@asdf.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  });

  // findUser 테스트
  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  // id로 유저를 찾을 수 없는 경우 테스트
  it('findUser thorws an error if a user with the given id is not found', async () => {
    fakeUsersService.findOne = () => Promise.resolve(null);
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);
  });

  // signin 테스트
  it('signin updates session object and returns user', async () => {
    const session: { userId?: number } = {};
    const user = await controller.signin(
      { email: 'asdf@asdf.com', password: 'asdf' },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
