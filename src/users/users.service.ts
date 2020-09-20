import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserDTO } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  readonly saltRounds = 10;
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  /**
   * Permet d'enregistrer un utilisateur dans la bbb
   * @param user
   */
  async register(user: CreateUserDTO): Promise<UserDTO> {
    user.password = await bcrypt.hash(user.password, this.saltRounds);
    const createdUser = new this.userModel(user);
    const response = await createdUser.save();
    return {
      id: response._id,
      username: response.username,
      email: response.email,
    };
  }

  /**
   * Permet de trouver l'utilisateur avec le usename en parametre
   * @param username
   */
  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username: username });
  }

  /**
   * Permet de récupérer tous les utilisateurs
   */
  async findAll(): Promise<Array<UserDTO>> {
    const users = await this.userModel.find();
    return users.map(user => ({
      id: user._id,
      username: user.username,
      email: user.email,
    }));
  }
}
