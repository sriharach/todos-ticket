import { PayloadLogin, PayloadUser, User } from '@/interface/auth.interface';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthEntity } from './auth.entity';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthEntity.name) private authModel: Model<AuthEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass?: string) {
    const user = await this.authModel.findOne({ email });
    const isMatch = await bcrypt.compare(pass, user.password);

    if (user.email !== email) {
      throw new NotFoundException('User not found!');
    }
    if (!isMatch) {
      throw new NotFoundException('Passwords not match');
    }

    return user;
  }

  async login(body: PayloadLogin) {
    const response = await this.validateUser(body.email, body.password);
    const payload = {
      username: response.username,
      sub: response._id,
      email: response.email,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRETKEY,
      }),
      refresh_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRETKEY,
        expiresIn: '1d',
      }),
    };
  }

  async create(body: PayloadUser) {
    const user = await this.authModel.findOne({ email: body.email });
    if (!user) {
      const hash = await bcrypt.hash(body.password, saltOrRounds);
      body.password = hash;

      const created = new this.authModel(body);
      return created.save();
    }
    throw new BadRequestException('User is dupicate')
  }
}
