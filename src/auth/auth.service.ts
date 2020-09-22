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
import { CreateUserDTO } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Permet de d'enregister un utilisateur
   * @param { CreateUserDTO } user
   */
  async register(user: CreateUserDTO): Promise<UserDTO> {
    return this.usersService.register(user);
  }

  /**
   * Permet de logger (créer un token) pour l'utilisateur
   * @param { UserCredencialsDTO } user
   */
  async login(user: UserCredencialsDTO): Promise<TokenDTO> {
    const payload: JwtPayload = { username: user.username };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  /**
   * Permet de valider les credencials de l'utilisateur
   * @param credencials
   */
  async validateUser(credencials: UserCredencialsDTO): Promise<User> {
    const user = await this.usersService.findOne(credencials.username);

    if (!user) {
      throw new HttpException(
        'Login ou mot de passe incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const samePass = await bcrypt.compare(credencials.password, user.password);

    if (!samePass) {
      throw new HttpException(
        'Login ou mot de passe incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
