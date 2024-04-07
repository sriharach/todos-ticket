import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Document } from 'mongoose';
import { MusicalZone } from './musical-zone.entity';
import { Musical } from '@/musical/musical.entity';
import { MusicalRowService } from '@/musical-row/musical-row.service';
import { JwtPayload } from '@/auth/jwt.strategy';

@Injectable()
export class MusicalZoneService {
  constructor(
    @InjectModel(MusicalZone.name) private musicalZoneModel: Model<MusicalZone>,
  ) {}

  async findOne(_id: MusicalZone['_id']) {
    return this.musicalZoneModel.findOne({ _id });
  }

  async findAll() {
    return this.musicalZoneModel.find();
  }

  async create(user: JwtPayload, body: MusicalZone[]) {
    const created = [];
    for (let index = 0; index < body.length; index++) {
      created.push(
        new this.musicalZoneModel({
          _id: new Types.ObjectId(),
          user_id: new Types.ObjectId(user.sub),
          musical_id: new Types.ObjectId(body[index].musical_id),
          seats: body[index].seats,
        }),
      );
    }
    return await this.musicalZoneModel.bulkSave(created);
  }

  async update(body: MusicalZone) {
    return this.musicalZoneModel.updateOne({ _id: body._id }, { ...body });
  }
}
