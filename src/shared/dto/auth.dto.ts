import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
} from "class-validator";

export class SignInDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsString({ message: 'Email have to a string' })
  @IsEmail({}, { message: 'Non correction email' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString({ message: 'Password have to a string' })
  @Length(4, 16, {
    message: 'Password cannot be less than 4 and no more than 16 characters',
  })
  readonly password: string;
}

export class SignUpDto {
  @IsNotEmpty({ message: 'nickname cannot be empty' })
  @IsString({ message: 'nickname have to a string' })
  readonly nickname: string;

  @IsNotEmpty({ message: 'name cannot be empty' })
  @IsString({ message: 'name have to a string' })
  readonly name: string;

  @IsNotEmpty({ message: 'surname cannot be empty' })
  @IsString({ message: 'surname have to a string' })
  readonly surname: string;

  @IsNotEmpty({ message: 'email cannot be empty' })
  @IsString({ message: 'email have to a string' })
  @IsEmail({}, { message: 'Non correction email' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString({ message: 'Password have to a string' })
  @Length(4, 16, {
    message: 'Password cannot be less than 4 and no more than 16 characters',
  })
  readonly password: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString({ message: 'Password have to a string' })
  @Length(4, 16, {
    message: 'Password cannot be less than 4 and no more than 16 characters',
  })
  readonly confirmPassword: string;
}
