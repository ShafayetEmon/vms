import { Controller, Body, Get, Param, Patch, UseGuards, Delete, Request } from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateVolunteerDto } from './updateVolunteer.dto';
import { IsAdmin } from '../auth/guards/isAdmin';

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
  @UseGuards(IsAdmin)
  async updateVolunteerById(@Body() updatevolunteerDto: UpdateVolunteerDto, @Param('id') id){
    return await this.volunteerService.updatevolunteer(updatevolunteerDto, id)
  }

  @Delete(":id")
  @UseGuards(IsAdmin)
  async deleteVolunteerById(@Param('id') id){
    return await this.volunteerService.deleteVolunteer(id);
  }
}
