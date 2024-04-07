import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PayloadLogin, PayloadUser } from '@/interface/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  findOne(@Body() body: PayloadLogin) {
    return this.authService.login(body);
  }

  @Post('register')
  create(@Body() body: PayloadUser) {
    if (!body.email || !body.password || !body.username) {
      throw new BadRequestException('Requert to Email');
    }
    return this.authService.create(body);
  }
}
