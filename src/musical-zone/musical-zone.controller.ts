import { AccessTokenGuard } from '@/auth/accessToken.guard';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { MusicalZoneService } from './musical-zone.service';
import { MusicalZone } from './musical-zone.entity';

@Controller('musical-zone')
export class MusicalZoneController {
  constructor(private readonly musicalService: MusicalZoneService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Req() req, @Body() body: MusicalZone[]) {
    return this.musicalService.create(req.user, body);
  }
}
