import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { VolunteerTaskDto } from "./volunteerTask.dto";
import { VolunteerTaskService } from "./volunteerTask.service";
import { IsAdmin } from "../auth/isAdmin";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
@Controller('volunteers/:volunteerId/tasks')
@UseGuards(JwtAuthGuard)
export class VolunteerTaskController {
  constructor(private volunteerTaskService: VolunteerTaskService) { }

  @Get()
  async getVolunteerTasks(@Param('volunteerId') id) {
    return this.volunteerTaskService.getVolunteerTasks(id)
  }

  @Post()
  @UseGuards(IsAdmin)
  async assignTaskToVolunteer(@Body() volunterTaskDto: VolunteerTaskDto, @Param('volunteerId') id) {
    return this.volunteerTaskService.assignTaskToVolunteer(volunterTaskDto)
  }

  @Delete(":taskId")
  @UseGuards(IsAdmin)
  removeTaskForVolunteer(@Param('volunteerId') volunteerId: number, @Param('taskId') taskId: number) {
    return this.volunteerTaskService.removeTaskAssignment(volunteerId, taskId)
  }
}