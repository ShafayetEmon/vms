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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IsAdmin } from '../auth/isAdmin';
import { TaskDto } from './Task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard, IsAdmin)
  async getAllTask(){
    return this.taskService.getAllTask();
  }

  @Post('create')
  @UseGuards(JwtAuthGuard, IsAdmin)
  async createTask(@Body() TaskDto: TaskDto) {
    const task = await this.taskService.createTask(TaskDto);
    return { message: 'Task created successfully', task };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getTaskById(@Param('id') id) {
    return await this.taskService.getTaskById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, IsAdmin)
  async updateTask(@Body() taskDto: TaskDto, @Param('id') id) {
    return await this.taskService.updateTask(taskDto, id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, IsAdmin)
  async deleteTask(@Param('id') id) {
    return await this.taskService.deleteTask(id);
  }
}
