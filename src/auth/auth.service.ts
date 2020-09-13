import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserCredencialsDTO } from '../users/dto/user-credencials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { TokenDTO } from './dto/token-dto.class';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(user: UserCredencialsDTO): Promise<User> {
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

    const samePass = this.comparePasswords(user.password, credencials.password);

    if (!samePass) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  /**
   * Methode permettant de comparer le pass de login et le pass du user
   * @param pass1
   * @param pass2
   */
  comparePasswords(pass: string, cryptedPass: string): boolean {
    // TODO: permettre de comparer un pass en clair et un pass crypté
    return pass === cryptedPass;
  }
}
