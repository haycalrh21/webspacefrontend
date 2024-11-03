import myAxios from "@/lib/axios.config";

import { AuthOptions, ISODateString } from "next-auth";
import { AxiosError } from "axios"; // Import AxiosError to handle axios-specific errors

import CredentialsProvider from "next-auth/providers/credentials";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const nextAuthSecret = process.env.NEXTAUTH_SECRET;

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
  token?: string;
  role?: string;
}

export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  profile_image?: string | null;
  token?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export const authOptions: AuthOptions = {
  secret: nextAuthSecret,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update" && session?.profile_image) {
        const user: CustomUser = token.user as CustomUser;
        user.profile_image = session?.profile_image;
      }
      if (user) {
        token.user = user as CustomUser;
      }
      return token;
    },

    async session({ session, token }) {
      const customSession: CustomSession = {
        ...session,
        user: token.user as CustomUser,
        token: token.token as string,
        role: token.role as string,
      };
      return customSession;
    },
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          const res = await myAxios.post(`${apiUrl}/auth/login`, credentials);
          const response = res.data;

          const user = response?.user;

          if (user && response.token) {
            user.token = response.token; // Simpan accessToken dari respons
            return user;
          } else {
            return null;
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            console.error("Login error:", error.response?.data); // Log specific error response data
          } else {
            console.error("An unexpected error occurred:", error);
          }
          return null; // Return null if there is an error during login
        }
      },
    }),
  ],
};
