import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId, Types } from 'mongoose';
import { Musical } from './musical.entity';
import { Model } from 'mongoose';
import { MusicalZone } from '@/musical-zone/musical-zone.entity';
import { MusicalRow } from '@/musical-row/musical-row.entity';
import { JwtPayload } from '@/auth/jwt.strategy';

@Injectable()
export class MusicalService {
  constructor(
    @InjectModel(Musical.name) private musicalModel: Model<Musical>,
  ) {}

  async findOne(_id: Types.ObjectId) {
    return this.musicalModel.findOne({ _id });
  }

  async create(user: JwtPayload, body: Musical) {
    if (!body.musical_name) {
      throw new BadRequestException('Invalid musical');
    }

    body.user_id = new Types.ObjectId(user.sub);
    body.activity_date = new Date(body.activity_date).toISOString();

    const created = new this.musicalModel(body);
    created._id = new Types.ObjectId();
    const saved = await created.save();

    return saved;
  }

  async reservation(body: MusicalRow) {}
}
