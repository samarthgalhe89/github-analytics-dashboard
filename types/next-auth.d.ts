// Extend the next-auth types to include accessToken
import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    username?: string;
  }
}
