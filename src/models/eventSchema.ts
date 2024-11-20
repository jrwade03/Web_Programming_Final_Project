import mongoose, { Schema, Document, Model } from "mongoose";

interface Event extends Document {
    name: string;
    location: string;
    data: Date;
    userId: mongoose.Types.ObjectId;
}
const eventSchema = new Schema<Event>({
    title: { 
        type: String, 
        required: true },
    description: {
        type: String },
    date: {
        type: Date, required: true },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true }, // Reference to User model
  });
  
  const Event = mongoose.models.Event || mongoose.model<Event>("Event", eventSchema);
  export default Event;