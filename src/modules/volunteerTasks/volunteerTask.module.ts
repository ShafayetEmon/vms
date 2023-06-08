import { Module } from "@nestjs/common";
import { VolunteerTaskService } from "./volunteerTask.service";
import { VolunteerTaskController } from "./volunteerTask.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VolunteerTask } from "./volunteerTask.entity";

@Module({
  imports: [TypeOrmModule.forFeature([VolunteerTask])],
  providers:[VolunteerTaskService],
  controllers:[VolunteerTaskController],
})

export class VolunteerTaskModule{}