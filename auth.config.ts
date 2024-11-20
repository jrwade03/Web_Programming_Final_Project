import { NextAuthOptions } from "next-auth";
export const authConfig: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [],
};