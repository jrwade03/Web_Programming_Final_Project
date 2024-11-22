import connectMongoDB from "../../libs/mongodb";
import {User} from "@/models/userSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { signIn, signOut } from "next-auth/react";

export async function POST(request: NextRequest) {
    const { email, password} = await request.json();
    console.log("Attempting to connect to mongo");
    await connectMongoDB();
    console.log("connected to mongo")
    console.log("Request Body:", email);
    console.log("Request Body:", password);
    console.log("Start findOne query");

    const existingUser = await User.findOne({email});
    console.log("getting here post");
    console.log("done")
    
    if (!existingUser){
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    //try {
    await User.create( { email, password: hashedPassword});
    return NextResponse.json({ message: "Item added successfully"}, { status: 201})
    } else {
        console.log("user already there");
    }
    //} catch {
      //  console.log("no work");
   // }
}


