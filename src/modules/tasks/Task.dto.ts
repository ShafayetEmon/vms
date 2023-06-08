import { IsDate, IsString } from "class-validator";

export class TaskDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDate()
  date: Date;

  @IsString()
  location: string;
}
