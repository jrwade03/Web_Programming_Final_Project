import mongoose, { Schema, Document } from "mongoose";

interface Event extends Document {
  title: string;
  description?: string;
  date: Date;
  location: string;
  userId: mongoose.Types.ObjectId;
  guests: string;
}

const eventSchema = new Schema<Event>({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String, required: true },
  location: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  time: { type: String, required: true },
  guests: { type: String, required: false },
});

const Event = mongoose.models.Event || mongoose.model<Event>("Event", eventSchema);
export default Event;