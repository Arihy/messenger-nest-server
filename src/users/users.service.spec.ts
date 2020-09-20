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
      { id: '2135225', username: 'admin', email: 'admin@gmail.com' },
      { id: '2135298', username: 'Jo', email: 'jo@gmail.com' },
      { id: '2545225', username: 'Martin', email: 'martin@gmail.com' },
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
    const expectedUsers = await service.findAll();
    expect(expectedUsers).toBeInstanceOf(Array);
    expect(expectedUsers).toHaveLength(3);
  });
});
