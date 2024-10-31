import NextAuth from "next-auth/next";
import { authOptions } from "./authOption";

const nextAuth = NextAuth(authOptions);

export { nextAuth as GET, nextAuth as POST };
