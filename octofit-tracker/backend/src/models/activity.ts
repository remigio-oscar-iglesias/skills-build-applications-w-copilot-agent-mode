import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: string;
  duration: number;
  date: string;
  notes: string;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: String, required: true },
  notes: { type: String, required: true }
});

export const Activity = mongoose.model<IActivity>('Activity', activitySchema);
