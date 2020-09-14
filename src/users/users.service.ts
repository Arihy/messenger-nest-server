import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { UserCredencialsDTO } from './dto/user-credencials.dto';
import { UserDTO } from './dto/user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  readonly saltRounds = 10;
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(user: UserCredencialsDTO): Promise<User> {
    user.password = await bcrypt.hash(user.password, this.saltRounds);
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findOne(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async findAll(): Promise<Array<UserDTO>> {
    const users = await this.userModel.find().exec();
    return users.map(user => ({ id: user._id, username: user.username }));
  }
}
