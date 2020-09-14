import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { TokenDTO } from './auth/dto/token-dto.class';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { User } from './users/schemas/user.schema';
import { UserCredencialsDTO } from './users/dto/user-credencials.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/signup')
  async signup(@Body() userCredencials: UserCredencialsDTO): Promise<User> {
    return this.authService.register(userCredencials);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() userCredencials: UserCredencialsDTO): Promise<TokenDTO> {
    return this.authService.login(userCredencials);
  }
}
