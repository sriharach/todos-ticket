import { User } from '@/interface/auth.interface';
import wait from '@/util/wait';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(@Inject(CACHE_MANAGER) private caheManager: Cache) {}

  // async refCaheMenager() {
  //   const cachedData = await this.caheManager.get<User[]>('users');
  //   if (cachedData) return cachedData;

  //   await this.caheManager.set('users', users);
  //   await wait(1000);

  //   return cachedData;
  // }

  // async findAll() {
  //   return this.refCaheMenager();
  // }

  // async findOne(email: string) {
  //   const users = await this.refCaheMenager();
  //   const found = users.find(user => user.email === email);
  //   if (!found) throw new NotFoundException('User not found!');

  //   return found;
  // }
}
