import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserCredencialsDTO } from '../users/dto/user-credencials.dto';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { TokenDTO } from './dto/token-dto.class';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserDTO } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(user: UserCredencialsDTO): Promise<UserDTO> {
    return this.usersService.register(user);
  }

  async login(user: UserCredencialsDTO): Promise<TokenDTO> {
    const payload: JwtPayload = { username: user.username };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(credencials: UserCredencialsDTO): Promise<User> {
    const user = await this.usersService.findOne(credencials.username);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    const samePass = await bcrypt.compare(credencials.password, user.password);

    if (!samePass) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
