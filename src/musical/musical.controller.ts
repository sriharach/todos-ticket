import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { MusicalService } from './musical.service';
import { Musical } from './musical.entity';
import { AccessTokenStrategy } from '@/auth/jwt.strategy';
import { AccessTokenGuard } from '@/auth/accessToken.guard';

@Controller('musical')
export class MusicalController {
  constructor(private readonly musicalService: MusicalService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Req() req, @Body() body: Musical) {
    return this.musicalService.create(req.user, body);
  }
}
