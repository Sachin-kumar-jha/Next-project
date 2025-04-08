import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      email: string;
      image?: string;
      isVerified: boolean;
      otpUserId?: string | null;
    } & DefaultSession["user"];
  }
}
