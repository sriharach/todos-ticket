import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MusicalRow } from './musical-row.entity';
import { JwtPayload } from '@/auth/jwt.strategy';
import { MusicalZoneService } from '@/musical-zone/musical-zone.service';

@Injectable()
export class MusicalRowService {
  constructor(
    @InjectModel(MusicalRow.name)
    private readonly musicalRowModel: Model<MusicalRow>,
    private musicalZoneService: MusicalZoneService,
  ) {}

  async findOne(_id: Types.ObjectId) {
    return this.musicalRowModel.findOne({ _id });
  }

  async findAll() {
    return this.musicalRowModel.find();
  }

  async create(user: JwtPayload, body: MusicalRow[]) {
    const created = [];

    const getmusicalZones = await this.musicalZoneService.findAll();
    for (let index = 0; index < getmusicalZones.length; index++) {
      const element = getmusicalZones[index];

      for (let f = 0; f < element.seats; f++) {
        created.push(
          new this.musicalRowModel({
            _id: new Types.ObjectId(),
            seats_no: `A${f + 1}`,
            user_id: new Types.ObjectId(user.sub),
            musical_zone_id: new Types.ObjectId(body[index].musical_zone_id),
            musical_id: new Types.ObjectId(body[index].musical_id),
          }),
        );
      }
    }

    return await this.musicalRowModel.bulkSave(created);
  }

  async update(body: MusicalRow) {
    return this.musicalRowModel.updateOne({ _id: body._id }, { ...body });
  }
}
