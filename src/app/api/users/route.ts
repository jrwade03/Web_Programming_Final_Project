import connectMongoDB from "../../libs/mongodb";
import {User} from "@/models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { signIn, signOut } from "next-auth/react";

export async function POST(request: NextRequest) {
    try {
      await connectMongoDB();
  
      const { email, password, action } = await request.json();
  
      if (!email || !password) {
        return NextResponse.json(
          { error: "Email and password are required." },
          { status: 400 }
        );
      }
  
      if (action === "login") {
        // Login logic
        const user = await User.findOne({ email });
  
        if (!user) {
          return NextResponse.json(
            { error: "User not found." },
            { status: 404 }
          );
        }
  
        const isPasswordValid = await bcrypt.compare(password, user.password);
  
        if (!isPasswordValid) {
          return NextResponse.json(
            { error: "Invalid password." },
            { status: 401 }
          );
        }
  
        return NextResponse.json(
          { message: "Login successful!", userId: user._id },
          { status: 200 }
        );
      } else if (action === "register") {
        // Registration logic
        const existingUser = await User.findOne({ email });
  
        if (existingUser) {
          return NextResponse.json(
            { error: "User already exists." },
            { status: 409 }
          );
        }
  
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
  
        const newUser = await User.create({ email, password: hashedPassword });
  
        return NextResponse.json(
          { message: "User registered successfully!", userId: newUser._id },
          { status: 201 }
        );
      } else {
        return NextResponse.json(
          { error: "Invalid action." },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Error in /api/users:", error);
      return NextResponse.json(
        { error: "Internal server error." },
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
