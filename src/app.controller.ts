import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { TokenDTO } from './auth/dto/token-dto.class';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { User } from './users/schemas/user.schema';
import { UserCredencialsDTO } from './users/dto/user-credencials.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('auth/signup')
  async signup(@Request() req: any): Promise<User> {
    return this.authService.register(req.body as UserCredencialsDTO);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any): Promise<TokenDTO> {
    return this.authService.login(req.user);
  }
}
