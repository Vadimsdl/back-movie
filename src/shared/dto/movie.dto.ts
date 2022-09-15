import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../schemas/user.schema';

export class MovieDto {
  @IsNotEmpty({ message: 'name cannot be empty' })
  @IsString({ message: 'name have to a string' })
  readonly name: string;

  @IsNotEmpty({ message: 'description cannot be empty' })
  @IsString({ message: 'description have to a string' })
  readonly description: string;

  @IsNotEmpty({ message: 'score cannot be empty' })
  @IsString({ message: 'score have to a string' })
  readonly score: string;

  @IsNotEmpty({ message: 'owner cannot be empty' })
  @IsString({ message: 'owner have to a string' })
  readonly owner: string | User;
}

export class MovieUpdateDto {
  @IsString({ message: 'name have to a string' })
  readonly name: string;

  @IsString({ message: 'description have to a string' })
  readonly description: string;

  @IsString({ message: 'score have to a string' })
  readonly score: string;

  @IsString({ message: 'owner have to a string' })
  readonly owner: string | User;
}
