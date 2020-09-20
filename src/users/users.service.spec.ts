import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserCredencialsDTO } from './dto/user-credencials.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  class mockUserModel {
    constructor(private data) {}
    save = jest.fn().mockResolvedValue(this.data);
    static findOne = jest
      .fn()
      .mockResolvedValue({ username: 'admin', password: 'secret' });
    static find = jest.fn().mockResolvedValue([
      { username: 'admin', password: 'secret' },
      { username: 'Jo', password: 'secret' },
      { username: 'Martin', password: 'secret' },
    ]);
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the admin user', async () => {
    const user: UserCredencialsDTO = {
      password: 'secret',
      username: 'admin',
    };

    const expectedUser = await service.findOne(user.username);
    expect(expectedUser.username).toEqual(user.username);
  });

  it('should return an array of users', async () => {
    const expectedUser = await service.findAll();
    expect(expectedUser).toBeInstanceOf(Array);
    expect(expectedUser).toHaveLength(3);
  });
});
