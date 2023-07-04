import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.authService.findUserById(payload.sub);
    if (user.accessToken === null) {
      throw new UnauthorizedException();
    }
    return {
      id: payload.sub,
      name: payload.username,
      userType: payload.userType,
    };
  }
}
