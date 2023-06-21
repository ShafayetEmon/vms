import { Module } from "@nestjs/common";
import { VolunteerTaskService } from "./volunteerTask.service";
import { VolunteerTaskController } from "./volunteerTask.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { VolunteerTask } from "./volunteerTask.entity";
import { VolunteerModule } from "../volunteers/volunteer.module";

@Module({
  imports: [TypeOrmModule.forFeature([VolunteerTask]), VolunteerModule],
  providers:[VolunteerTaskService],
  controllers:[VolunteerTaskController],
})

export class VolunteerTaskModule{}