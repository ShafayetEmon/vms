import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskDto } from './Task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  
  async getAllTask():Promise<Task[]>{
    return await this.taskRepository.createQueryBuilder().getMany();
  }

  async createTask(TaskDto: TaskDto): Promise<Task> {
    const task = await this.taskRepository.create(TaskDto);
    await this.taskRepository.save(task);

    return task;
  }

  async getTaskById(id: number): Promise<Task | null> {
    return await this.taskRepository.findOne({ where: { id } });
  }

  async updateTask(taskDto, id: number): Promise<any> {
    const task = await this.getTaskById(id);
    if (task) {
      await this.taskRepository.update(id, taskDto);
      const updatedTask = await this.getTaskById(id);
      return { message: 'Task successfully updated', updatedTask };
    } else {
      return { message: 'Task Not Found' };
    }
  }

  async deleteTask(id: number) {
    const task = await this.getTaskById(id);
    if (task) {
      await this.taskRepository.delete(id);
      return { message: 'Task deleted successfully' };
    }
  }
}
