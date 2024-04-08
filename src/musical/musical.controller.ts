import { Body, Controller, Get, Param, Patch, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { MusicalService } from './musical.service';
import { Musical } from './musical.entity';
import { AccessTokenGuard } from '@/auth/accessToken.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('musical')
export class MusicalController {
  constructor(private readonly musicalService: MusicalService) {}

  @UseInterceptors(CacheInterceptor)
  @Get('musical-detail')
  getMusicalsDetail(@Query('musical_id') musical_id: string) {
    return this.musicalService.getMusicalsDetail(musical_id);
  }

  @Get()
  findAll() {
    return this.musicalService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Req() req, @Body() body: Musical) {
    return this.musicalService.create(req.user, body);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Musical) {
    return this.musicalService.update(id, body);
  }
}
