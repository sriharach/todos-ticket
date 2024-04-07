import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.entity';
import { AccessTokenGuard } from '@/auth/accessToken.guard';

@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Req() req, @Body() body: Reservation) {
    return this.reservationService.create(req.user, body);
  }

  @UseGuards(AccessTokenGuard)
  @Get() 
  musicalBooking(@Req() req) {
    return this.reservationService.musicalBooking(req.user)
  }
}
