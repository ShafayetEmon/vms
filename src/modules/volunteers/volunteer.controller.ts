import { Controller, Body, Get, Param, Patch, UseGuards, Delete, Request } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateVolunteerDto } from './updateVolunteer.dto';

@Controller('volunteers')
@UseGuards(JwtAuthGuard)
export class VolunteerController {
  constructor(private volunteerService: VolunteerService) {}

  @Get('/')
  async getAllVolunteers(){
    return this.volunteerService.getAll()
  }

  @Get(':id')
  async getVolunteerById(@Param('id') id) {
    return await this.volunteerService.getVolunteerById(id)
  }

  @Patch(":id")
  async updateVolunteerById(@Body() updatevolunteerDto: UpdateVolunteerDto, @Param('id') id){
    return await this.volunteerService.updatevolunteer(updatevolunteerDto, id)
  }

  @Delete(":id")
  async deleteVolunteerById(@Param('id') id){
    return await this.volunteerService.deleteVolunteer(id);
  }
}
