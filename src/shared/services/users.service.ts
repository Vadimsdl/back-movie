import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDto } from '../dto/user.dto';
import { SignUpDto } from '../dto/auth.dto';
import { UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly users: Model<UserDocument>,
  ) {}

  async create(createCatDto: UserDto | SignUpDto): Promise<UserDto> {
    try {
      const createdUser = await this.users.create(createCatDto);
      return createdUser;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async getUserById(id: string): Promise<UserDto> {
    try {
      const foundUser = await this.users.findById(id);
      return foundUser;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
