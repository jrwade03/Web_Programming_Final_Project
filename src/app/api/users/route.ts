import connectMongoDB from "../../libs/mongodb";
import {User} from "@/models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { signIn, signOut } from "next-auth/react";

export async function POST(request: NextRequest) {
    const { email, password} = await request.json();
    console.log("Request Body:", email);
    console.log("Request Body:", password);
    /**onsole.log("Request Body:", googleId);*/

    await connectMongoDB();
    const existingUser = await User.findOne({ email });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    await User.create( { email, password: hashedPassword});
    return NextResponse.json({ message: "Item added successfully"}, { status: 201})
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
