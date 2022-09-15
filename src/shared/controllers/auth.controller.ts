import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto, SignUpDto } from '../dto/auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  private async signIn(@Body() data: SignInDto) {
    return await this.authService.signIn(data);
  }

  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  private async signUp(@Body() data: SignUpDto) {
    return await this.authService.signUp(data);
  }
}
