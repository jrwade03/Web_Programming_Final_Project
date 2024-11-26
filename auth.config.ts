/**import { NextAuthOptions } from "next-auth";
export const authConfig: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [],
};*/
import {NextAuthConfig} from "next-auth";

export const authConfig: NextAuthConfig = {
    session: {
        strategy: "jwt",
    },
    providers:[]
};