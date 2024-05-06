import NextAuth from "next-auth/next";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

// GET,POST jasto function name le kaam garnu parxa rey route.ts wala file haru ma 
export{handler as GET, handler as POST}