import * as mongoose from 'mongoose';

export const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // id: { type: String, required: false },
});

export interface Task extends mongoose.Document {
  id: string;
  title: string;
}
