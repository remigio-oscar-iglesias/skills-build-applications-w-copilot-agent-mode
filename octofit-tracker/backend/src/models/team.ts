import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  focus: string;
  members: number;
  captain: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  focus: { type: String, required: true },
  members: { type: Number, required: true },
  captain: { type: String, required: true }
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
