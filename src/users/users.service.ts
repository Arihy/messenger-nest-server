import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    // TODO: ajouter une bdd pour stocker les users
    // TODO: crypter le pass
    this.users = [
      {
        id: 1,
        username: 'admin',
        password: 'secretPass123',
      },
      {
        id: 2,
        username: 'chris',
        password: 'secret',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
