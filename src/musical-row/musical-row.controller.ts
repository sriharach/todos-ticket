import { AccessTokenGuard } from '@/auth/accessToken.guard';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { MusicalRow } from './musical-row.entity';
import { MusicalRowService } from './musical-row.service';

@Controller('musical-row')
export class MusicalRowController {
    constructor(private readonly musicalRowService: MusicalRowService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Req() req, @Body() body: MusicalRow[]) {
    return this.musicalRowService.create(req.user, body);
  }
}
