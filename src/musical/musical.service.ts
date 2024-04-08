import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Musical } from './musical.entity';
import { Model } from 'mongoose';
import { JwtPayload } from '@/auth/jwt.strategy';
import { ReservationService } from '@/reservation/reservation.service';
import { MusicalZoneService } from '@/musical-zone/musical-zone.service';
import { MusicalRowService } from '@/musical-row/musical-row.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class MusicalService {
  constructor(
    @InjectModel(Musical.name)
    private readonly musicalModel: Model<Musical>,
    private musicalZoneService: MusicalZoneService,
    private musicalRowService: MusicalRowService,
    @Inject(forwardRef(() => ReservationService)) private readonly reservationService: ReservationService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getMusicalsDetail(_id: string) {
    const cacheData = await this.cacheManager.get('musical-detail');
    if (cacheData) return cacheData;

    const [getMusicalData, musicalZone, musicalRows] = await Promise.all([
      this.findOne(new Types.ObjectId(_id)),
      this.musicalZoneService.findAll(),
      this.musicalRowService.findAll(),
    ]);
    const joinMusicalZone = musicalZone.filter(e => String(e.musical_id) === _id);

    const modalResponse = {
      _id: getMusicalData._id,
      musical_name: getMusicalData.musical_name,
      zones: joinMusicalZone.map(joinzode => ({
        _id: joinzode._id,
        is_open_zone: joinzode.is_open_zone,
        seats: joinzode.seats,
        rows: musicalRows
          .filter(e => String(e.musical_zone_id) === String(joinzode._id))
          .map(mapper => ({ _id: mapper._id, reservation: mapper.reservation })),
      })),
    };

    await this.cacheManager.set('musical-detail', modalResponse, 30 * 100);
    // this.cacheManager.reset()
    
    return modalResponse;
  }

  async findAll() {
    return await this.musicalModel.find();
  }

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

  async update(_id: string, body: Musical) {
    return this.musicalModel.updateOne({ _id: new Types.ObjectId(_id) }, { ...body });
  }
}
