import {
  Body,
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  @UsePipes(ValidationPipe)
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.handleRegistration(registerDto);
    return { message: 'User created successfully', user };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  async getUser(@Request() req) {
    return req.user;
  }
}
