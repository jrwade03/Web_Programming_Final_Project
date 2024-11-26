import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "@/models/userSchema";
import Email from "next-auth/providers/email";

export const {
  handlers: {GET, POST},
  auth, 
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {label: "Email"},
        password: {label:"Password", type:"password"}
      },
      async authorize(credentials){
        if(!credentials) {
          return null
        }
        try {
          const user = await User.findOne({email: credentials.email}).lean();

          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
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
          console.log("An error occured: ", error);
          return null;
        }
      },
    }),
  ],
});