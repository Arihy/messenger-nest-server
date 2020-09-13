import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/interfaces/user.interface';
import { UsersService } from '../users/users.service';
import { CredencialsDTO } from '../users/dto/credencials-dto.class';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { TokenDTO } from './dto/token-dto.class';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: User): Promise<TokenDTO> {
    const payload: JwtPayload = { username: user.username, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(credencials: CredencialsDTO): Promise<User> {
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
