import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
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

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      userType: user.userType,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(user: any) {
    return { message: 'User logged out successfully' };
  }

  async validateUserCreds(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) throw new BadRequestException();

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException();

    return user;
  }
}
