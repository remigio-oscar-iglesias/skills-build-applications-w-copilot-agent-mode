import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: string;
  fitnessLevel: string;
  weeklyGoal: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  fitnessLevel: { type: String, required: true },
  weeklyGoal: { type: String, required: true }
});

export const User = mongoose.model<IUser>('User', userSchema);
