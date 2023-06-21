import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VolunteerTask } from './volunteerTask.entity';
import { sendEmail } from 'src/config/nodemailer.config';
import { VolunteerService } from '../volunteers/volunteer.service';

@Injectable()
export class VolunteerTaskService {
  constructor(
    @InjectRepository(VolunteerTask)
    private volunteerTaskRepository: Repository<VolunteerTask>,
    private volunteerService: VolunteerService,
  ) {}

  async getVolunteerTasks(id: number): Promise<VolunteerTask[] | any> {
    const tasks = await this.volunteerTaskRepository
      .createQueryBuilder('volunteerTask')
      .leftJoinAndSelect('volunteerTask.task', 'task')
      .where('volunteerTask.volunteerId = :id', { id })
      .getMany();

    if (!tasks) return { message: 'No Task is assigned' };
    return tasks;
  }

  async checkVolunteerTaskExist(volunteerId: number, taskId: number) {
    const checkVolunteerTaskExist = await this.volunteerTaskRepository
      .createQueryBuilder('volunteerTask')
      .where('volunteerTask.volunteer = :volunteerId', { volunteerId })
      .andWhere('volunteerTask.task = :taskId', { taskId })
      .getOne();

    return checkVolunteerTaskExist;
  }

  async assignTaskToVolunteer(volunteerTaskDto) {
    const { volunteerId, taskId } = volunteerTaskDto;
    const checkVolunteerTaskExist = this.checkVolunteerTaskExist(
      volunteerId,
      taskId,
    );

    if (checkVolunteerTaskExist)
      throw new ConflictException(
        'This Task already assigned for this volunteer.',
      );

    const volunteerTask = this.volunteerTaskRepository.create({
      volunteer: { id: volunteerTaskDto.volunteerId },
      task: { id: volunteerTaskDto.taskId },
    });

    const volunteerEmail = (
      await this.volunteerService.getVolunteerById(volunteerTaskDto.id)
    ).email;
    const subject = 'assigned to a task';
    const text = `You have been assigned a task". Please check your dashboard for more details.`;
    await sendEmail(volunteerEmail, subject, text);

    return this.volunteerTaskRepository.save(volunteerTask);
  }

  async removeTaskAssignment(volunteerId: number, taskId: number) {
    const volunteerTask = await this.checkVolunteerTaskExist(
      volunteerId,
      taskId,
    );

    if (!volunteerTask) {
      throw new NotFoundException('Volunteer task not found');
    } else {
      const volunteerEmail = (
        await this.volunteerService.getVolunteerById(volunteerId)
      ).email;
      const subject = 'You have been removed from a task';
      const text = `You have been removed from the task. Please contact the administrator for further information.`;
      await sendEmail(volunteerEmail, subject, text);
      await this.volunteerTaskRepository.remove(volunteerTask);
      return { message: 'Task removed successfully' };
    }
  }
}
