import connectMongoDB from "../../libs/mongodb";
import {User} from "@/models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { signIn, signOut } from "next-auth/react";

export async function POST(request: NextRequest) {
    try {
      const { email, password } = await request.json();
      console.log("Attempting to connect to MongoDB...");
      await connectMongoDB();
      console.log("Connected to MongoDB");
  
      console.log("Checking for existing user...");
      const existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        console.log("User not found. Creating new user...");
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
  
        await User.create({ email, password: hashedPassword });
  
        console.log("New user created successfully.");
        return NextResponse.json(
          { message: "User added successfully" },
          { status: 201 }
        );
      } else {
        console.log("User already exists.");
        return NextResponse.json(
          { message: "User already exists" },
          { status: 409 } // Conflict
        );
      }
    } catch (error) {
      console.error("Error in POST /api/users:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }

// Get All Users
export async function GET() {
    try {
      await connectMongoDB();
      const users = await User.find({}, { email: 1 });
      return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });

    }
}
