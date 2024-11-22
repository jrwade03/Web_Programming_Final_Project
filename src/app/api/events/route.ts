import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongodb";
import Event from "@/models/eventSchema";
import mongoose from "mongoose";

// Create Event
export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();
    const { title, description, date, location, userId, time } = await request.json();
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      userId: new mongoose.Types.ObjectId(userId),
      time,
    });
    await newEvent.save();
    return NextResponse.json({ message: "Event created successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// Get All Events
export async function GET() {
  try {
    await connectMongoDB();
    const events = await Event.find();
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}


// Update Event
export async function PATCH(request: NextRequest) {
  try {
    await connectMongoDB();
    const { id, ...updateData } = await request.json();
    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// Delete Event
export async function DELETE(request: NextRequest) {
  try {
    await connectMongoDB();
    const { id } = await request.json();
    await Event.findByIdAndDelete(id);
    return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}