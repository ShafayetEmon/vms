import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async handleRegistration(registerDto: RegisterDto) {
    const { email, userType } = registerDto;
    if (userType !== 'volunteer' && userType !== 'admin') {
      throw new BadRequestException('Invalid user type.');
    }
    const checkEmailExist = await this.userRepository.findOne({
      where: { email },
    });
    if (checkEmailExist) throw new ConflictException('Email already exists.');
    const user = await this.userRepository.create(registerDto);
    return this.userRepository.save(user);
  }

  async login(loginDto: LoginDto) {}

  async logout(user: any) {
    return { message: 'User logged out successfully' };
  }
}
