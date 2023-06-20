import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsAdmin } from '../auth/guards/isAdmin';
import { TaskDto } from './Task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private taskService: TaskService) { }

  @Get('/')
  @UseGuards(IsAdmin)
  async getAllTask() {
    return this.taskService.getAllTask();
  }

  @Post('create')
  @UseGuards(IsAdmin)
  async createTask(@Body() TaskDto: TaskDto) {
    const task = await this.taskService.createTask(TaskDto);
    return { message: 'Task created successfully', task };
  }

  @Get(':id')
  async getTaskById(@Param('id') id) {
    return await this.taskService.getTaskById(id);
  }

  @Patch(':id')
  @UseGuards(IsAdmin)
  async updateTask(@Body() taskDto: TaskDto, @Param('id') id) {
    return await this.taskService.updateTask(taskDto, id);
  }

  @Delete(':id')
  @UseGuards(IsAdmin)
  async deleteTask(@Param('id') id) {
    return await this.taskService.deleteTask(id);
  }
}
