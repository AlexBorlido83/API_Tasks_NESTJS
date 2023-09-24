import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async insertTask(title: string) {
    const newProduct = new this.taskModel({ title });
    const result = await newProduct.save();
    console.log(result);
    return result.id as string;
  }

  async getTasks() {
    const tasks = await this.taskModel.find().exec();
    return tasks as Task[];
  }

  async removeTask(prodId: string) {
    const result = await this.taskModel.deleteOne({ _id: prodId }).exec();
    console.log(result);
    if (result.deletedCount === 0) {
      throw new NotFoundException('Could not find product Sorry :(');
    }
  }
}
