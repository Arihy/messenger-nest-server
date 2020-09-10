import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    // TODO: ajouter une bdd pour stocker les users
    this.users = [
      {
        id: 1,
        username: 'admin',
        password: 'secretPass123',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
