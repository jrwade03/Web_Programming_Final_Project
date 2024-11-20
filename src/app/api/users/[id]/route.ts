import connectMongoDB from "../../../libs/mongodb";
import {User} from "@/models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { signIn, signOut } from "next-auth/react";

interface RouteParams {
    params: { id: string };
}
export async function GET(request: NextRequest, { params }: RouteParams) {
    const { id } = params;
    await connectMongoDB();
    console.log("Connected to MongoDB");
    // Try to fetch the user by ID and handle the response
    const user = await User.findOne({_id: id});
    console.log("Found user:", user);

    if (user) {
      return NextResponse.json({ user }, { status: 200 });
    } else {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
}