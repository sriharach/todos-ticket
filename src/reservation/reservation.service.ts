import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reservation } from './reservation.entity';
import { JwtPayload } from '@/auth/jwt.strategy';
import { MusicalRowService } from '@/musical-row/musical-row.service';
import { MusicalZoneService } from '@/musical-zone/musical-zone.service';
import { MusicalService } from '@/musical/musical.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationRowModel: Model<Reservation>,
    private musicalRowService: MusicalRowService,
    private musicalZoneService: MusicalZoneService,
    private musicalService: MusicalService,
  ) {}

  async musicalBooking(user: JwtPayload) {
    const foundReservation = await this.reservationRowModel.findOne({
      user_id: new Types.ObjectId(user.sub),
    });
    const foundRow = await this.musicalRowService.findOne(foundReservation.musical_row_id);
    const foundZone = await this.musicalZoneService.findOne(foundRow.musical_zone_id);
    const foundMusical = await this.musicalService.findOne(new Types.ObjectId(foundZone.musical_id));

    return {
      musical_name: foundMusical.musical_name,
      position_seats: foundRow.seats_no,
      activity_date: foundMusical.activity_date,
    };
  }

  async create(user: JwtPayload, body: Reservation) {
    body.user_id = new Types.ObjectId(user.sub);
    body.musical_row_id = new Types.ObjectId(body.musical_row_id);

    const findReservation = await this.musicalRowService.findOne(body.musical_row_id);
    await this.musicalRowService.update({
      _id: body.musical_row_id,
      reservation: true,
      musical_id: findReservation.musical_id,
      musical_zone_id: findReservation.musical_zone_id,
      user_id: body.user_id,
      seats_no: findReservation.seats_no,
    });

    const created = new this.reservationRowModel(body);
    created._id = new Types.ObjectId();
    return created.save();
  }

  async update(body: Reservation) {
    return this.reservationRowModel.updateOne({ _id: body._id }, { ...body });
  }
}
