import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignUpDto } from '../dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../schemas/user.schema';
import { compare } from 'bcrypt';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly users: Model<UserDocument>,
  ) {}

  async signIn(user: SignInDto): Promise<object> {
    try {
      const getUser = await this.users.findOne({ email: user.email });
      if (user && (await compare(user.password, getUser.password))) {
        return {
          id: getUser._id,
          access_token: this.jwtService.sign(user),
        };
      }
      throw new UnauthorizedException({
        message: 'Invalid email or password',
      });
    } catch {
      throw new UnauthorizedException({
        message: 'Invalid email or password',
      });
    }
  }

  async signUp(user: SignUpDto): Promise<UserDto> {
    if (user.password === user.confirmPassword) {
      const getUser = await this.users.findOne({
        nickname: user.nickname,
        email: user.email,
      });

      if (!getUser) {
        const createUser = await this.usersService.create(user);
        return createUser;
      }

      throw new HttpException(
        'User with this email already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException(
      'passwords do not match',
      HttpStatus.BAD_REQUEST,
    );
  }
}
