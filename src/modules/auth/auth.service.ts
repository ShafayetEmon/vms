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
import { Volunteer } from '../volunteers/volunteer.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Volunteer)
    private volunteerRepository: Repository<Volunteer>,
    private jwtService: JwtService,
  ) {}

  async handleRegistration(registerDto: RegisterDto) {
    const { email, userType } = registerDto;
    if (userType !== 'volunteer' && userType !== 'admin') {
      throw new BadRequestException('Invalid user type.');
    }

    const checkEmailExist = await this.findUserByEmail(email);
    if (checkEmailExist) throw new ConflictException('Email already exists.');

    const user = await this.userRepository.create(registerDto);
    await this.userRepository.save(user);

    if (userType == 'volunteer') {
      const volunteer = new Volunteer();
      volunteer.email = user.email;
      volunteer.user = user;
      await this.volunteerRepository.save(volunteer);
    }
    return user;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      userType: user.userType,
    };
    const access_token = this.jwtService.sign(payload);
    const salt = await bcrypt.genSalt();
    user.accessToken = await bcrypt.hash(access_token, salt);
    await this.userRepository.save(user);

    return { access_token: access_token };
  }

  async logout(user: any) {
    user.accessToken = null;
    await this.userRepository.save(user);
    return { message: 'User logged out successfully' };
  }

  async validateUserCreds(email: string, password: string): Promise<any> {
    const user = await this.findUserByEmail(email);

    if (!user) throw new BadRequestException();

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException();

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async findUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }
}
