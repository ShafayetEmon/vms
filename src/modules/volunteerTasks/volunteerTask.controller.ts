import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { VolunteerTaskDto } from "./volunteerTask.dto";
import { VolunteerTaskService } from "./volunteerTask.service";

@Controller('volunteers/:volunteerId/tasks')
export class VolunteerTaskController{
  constructor(private volunteerTaskService: VolunteerTaskService){}

  @Get()
  async getVolunteerTasks(@Param('volunteerId') id){
    return this.volunteerTaskService.getVolunteerTasks(id)
  }

  @Post()
  async assignTaskToVolunteer(@Body() volunterTaskDto: VolunteerTaskDto, @Param('volunteerId') id){
    return this.volunteerTaskService.assignTaskToVolunteer(volunterTaskDto)
  }

  @Delete(":taskId")
  removeTaskForVolunteer(@Param('volunteerId') volunteerId: number, @Param('taskId') taskId: number){
    return this.volunteerTaskService.removeTaskAssignment(volunteerId, taskId)
  }
}