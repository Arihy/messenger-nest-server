import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { TokenDTO } from './auth/dto/token-dto.class';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { UserCredencialsDTO } from './users/dto/user-credencials.dto';
import { UserDTO } from './users/dto/user.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/signup')
  async signup(@Body() userCredencials: UserCredencialsDTO): Promise<UserDTO> {
    return this.authService.register(userCredencials);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() userCredencials: UserCredencialsDTO): Promise<TokenDTO> {
    return this.authService.login(userCredencials);
  }
}
