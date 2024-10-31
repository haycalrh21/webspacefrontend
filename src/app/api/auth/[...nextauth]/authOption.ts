import axios from "axios";
import { AuthOptions, ISODateString, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
  token?: string; // Add this line
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
          const res = await axios.post(`${apiUrl}/auth/login`, credentials);
          const response = res.data;

          const user = response?.user;

          if (user && response.token) {
            user.token = response.token; // Simpan accessToken dari respons
            return user;
          } else {
            return null; // Mengembalikan null jika user atau accessToken tidak ada
          }
        } catch (error) {
          console.error("Login error:", error);
          return null; // Mengembalikan null jika ada error saat login
        }
      },
    }),
  ],
};
