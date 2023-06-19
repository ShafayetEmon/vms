import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Volunteer } from './volunteer.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class VolunteerService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Volunteer)
    private volunteerRepository: Repository<Volunteer>,
  ) {}

  async getAll(): Promise<Volunteer[]> {
    return await this.volunteerRepository.createQueryBuilder().getMany();
  }

  async getVolunteerById(id: number): Promise<Volunteer | null> {
    const volunteer = await this.volunteerRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!volunteer) {
      throw new NotFoundException("Volunteer not found.");
    }
    else return volunteer;
  }

  async updatevolunteer(updateVolunteerDto, id: number) {
    const volunteer = await this.getVolunteerById(id);
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
    const volunteer = await this.getVolunteerById(id);
    await this.volunteerRepository.delete(id);
    await this.userRepository.delete(volunteer.user.id);
    return { Message: 'successfully deleted' };
  }
}
