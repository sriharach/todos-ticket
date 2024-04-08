import { Body, Controller, Get, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.entity';
import { AccessTokenGuard } from '@/auth/accessToken.guard';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Req() req, @Body() body: Reservation) {
    return this.reservationService.create(req.user, body);
  }

  @UseInterceptors(CacheInterceptor)
  @UseGuards(AccessTokenGuard)
  @Get() 
  musicalBooking(@Req() req) {
    return this.reservationService.musicalBooking(req.user)
  }
}
