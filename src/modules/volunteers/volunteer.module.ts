import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VolunteerService } from './volunteer.service';
import { VolunteerController } from './volunteer.controller';
import { Volunteer } from './volunteer.entity';
import { User } from '../auth/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([User, Volunteer])],
  providers: [ VolunteerService],
  controllers: [VolunteerController],
})
export class VolunteerModule {}