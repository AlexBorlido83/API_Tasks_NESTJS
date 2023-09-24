import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async addTask(@Body('title') prodTitle: string) {
    const generatedId = await this.tasksService.insertTask(prodTitle);

    return { id: generatedId };
  }

  @Get()
  async getTasks() {
    const tasks = await this.tasksService.getTasks();
    return tasks.map((task) => ({
      title: task.title,
    }));
  }

  @Delete(':id')
  async deleteTask(@Param('id') prodId: string) {
    await this.tasksService.removeTask(prodId);
    return null;
  }
}
