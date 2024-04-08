import { Controller, Get, NotFoundException, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
// import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { AccessTokenStrategy } from '@/auth/jwt.strategy';

// @UseInterceptors(CacheInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenStrategy)
  @Get('findUsers')
  findAll() {
    // return this.userService.findAll();
  }

  // @Get()
  // findOne(@Query('email') email: string) {
  //   if (!email) throw new NotFoundException('Email is not sent.');
  //   return this.userService.findOne(email);
  // }
}
