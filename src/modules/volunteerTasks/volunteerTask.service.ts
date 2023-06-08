import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VolunteerTask } from './volunteerTask.entity';

@Injectable()
export class VolunteerTaskService {
  constructor(
    @InjectRepository(VolunteerTask)
    private volunteerTaskRepository: Repository<VolunteerTask>,
  ) {}

  async getVolunteerTasks(id: number): Promise<VolunteerTask[]> {
    return await this.volunteerTaskRepository
      .createQueryBuilder('volunteerTask')
      .leftJoinAndSelect('volunteerTask.task', 'task')
      .where('volunteerTask.volunteerId = :id', { id })
      .getMany();
  }

  async assignTaskToVolunteer(volunteerTaskDto) {
    const volunteerTask = this.volunteerTaskRepository.create({
      volunteer: { id: volunteerTaskDto.volunteerId },
      task: { id: volunteerTaskDto.taskId },
    });
    return this.volunteerTaskRepository.save(volunteerTask);
  }

  async removeTaskAssignment(volunteerId: number, taskId: number){

    const volunteerTask = await this.volunteerTaskRepository
      .createQueryBuilder('volunteerTask')
      .where('volunteerTask.volunteerId = :volunteerId', { volunteerId })
      .andWhere('volunteerTask.taskId = :taskId', { taskId })
      .getMany();
    
    if (!volunteerTask) {
      throw new NotFoundException('Volunteer task not found');
    }
    await this.volunteerTaskRepository.remove(volunteerTask);
    return {message: "Task removed successfully"}
  }
}
