import type { DefaultSession } from "next-auth"

// Extend the NuxtAuth Session type with more information we pass in /server/api/auth/[...].ts
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    access_token ?: string 
  }
}