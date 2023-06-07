import { Controller, Body, Get, Param, Patch, UseGuards, Delete } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateVolunteerDto } from './updateVolunteer.dto';


@Controller('volunteer')
export class VolunteerController {
  constructor(private volunteerService: VolunteerService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getAllVolunteers(){
    return this.volunteerService.getAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getVolunteerById(@Param('id') id) {
    return await this.volunteerService.getVolunteerById(id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updateVolunteerById(@Body() updatevolunteerDto: UpdateVolunteerDto, @Param('id') id){
    return await this.volunteerService.updatevolunteer(updatevolunteerDto, id)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async deleteVolunteerById(@Param('id') id){
    return await this.volunteerService.deleteVolunteer(id);
  }
}
