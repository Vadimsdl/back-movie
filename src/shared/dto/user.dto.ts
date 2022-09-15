import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'Nickname cannot be empty' })
  @IsString({ message: 'Nickname have to a string' })
  readonly nickname: string;

  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Name have to a string' })
  readonly name: string;

  @IsString({ message: 'Surname have to a string' })
  readonly surname: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsString({ message: 'Email have to a string' })
  @IsEmail({}, { message: 'Non correction email' })
  readonly email: string;
}
