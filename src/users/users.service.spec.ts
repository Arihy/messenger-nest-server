import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserCredencialsDTO } from './dto/user-credencials.dto';
import { User } from './schemas/user.schema';

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
    const user: UserCredencialsDTO = {
      password: 'secretPass123',
      username: 'admin',
    };

    const expectedUser = await service.findOne(user.username);
    expect(expectedUser.username).toEqual(user.username);
  });
});
