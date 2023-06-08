import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Volunteer } from '../volunteers/volunteer.entity';
import { Task } from '../tasks/task.entity';

@Entity()
export class VolunteerTask {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Volunteer, (volunteer) => volunteer.volunteerTasks, {
    onDelete: 'CASCADE',
  })
  volunteer: Volunteer;

  @ManyToOne(() => Task, (task) => task.volunteerTasks, { onDelete: 'CASCADE' })
  task: Task;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
