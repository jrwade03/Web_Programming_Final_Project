import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "@/models/userSchema";

export const authOptions = { 
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const user = await User.findOne({ email: credentials.email }).lean();
          console.log(user);
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            console.log("Password Match:", isMatch);

            if (isMatch) {
              return {
                id: user._id.toString(),
                email: user.email,
              };
            } else {
              console.log("Email or Password is not correct");
              return null;
            }
          } else {
            console.log("User not found");
            return null;
          }
        } catch (error: any) {
          console.log("An error occurred");
          return null;
        }
      }
    })
  ]
}//);