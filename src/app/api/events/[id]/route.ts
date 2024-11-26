import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongodb";
import Event from "@/models/eventSchema";
import mongoose from "mongoose";

// Get Event by ID
export async function GET(request: NextRequest) {
  try {
    await connectMongoDB();
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}