import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the admin user', async () => {
    const user: User = {
      id: 1,
      password: 'secretPass123',
      username: 'admin',
    };

    const expectedUser = await service.findOne('admin');
    expect(expectedUser).toEqual(user);
  });
});
