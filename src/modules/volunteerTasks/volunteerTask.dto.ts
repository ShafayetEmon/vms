import { IsNotEmpty, IsNumber } from 'class-validator';

export class VolunteerTaskDto {
  @IsNotEmpty()
  @IsNumber()
  volunteerId: number;

  @IsNotEmpty()
  @IsNumber()
  taskId: number;
}
