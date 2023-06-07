import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Volunteer } from './volunteer.entity';
import { User } from '../auth/user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class VolunteerService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Volunteer)
    private volunteerRepository: Repository<Volunteer>,
    private authService: AuthService,
  ) {}

  async getAll(): Promise<Volunteer[]> {
    return await this.volunteerRepository.createQueryBuilder().getMany();
  }

  async getVolunteerById(id): Promise<any> {
    return await this.authService.findVolunteerById(id);
  }

  async updatevolunteer(updateVolunteerDto, id: number) {
    const volunteer = await this.authService.findVolunteerById(id);
    if (volunteer) {
      volunteer.name = updateVolunteerDto.name;
      volunteer.phone = updateVolunteerDto.phone;
      volunteer.address = updateVolunteerDto.address;
      volunteer.skills = updateVolunteerDto.skills;
      await this.volunteerRepository.update(id, volunteer);
      return volunteer;
    }
  }

  async deleteVolunteer(id: number) {
    const volunteer = await this.authService.findVolunteerById(id);
    await this.volunteerRepository.delete(id);
    await this.userRepository.delete(volunteer.user.id);
    return { Message: 'successfully deleted' };
  }
}
