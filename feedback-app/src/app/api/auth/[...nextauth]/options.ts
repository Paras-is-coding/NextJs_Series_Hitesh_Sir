import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

// ts
export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
    //    next-auth will make html form behind the scene
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter email" },
        password: { label: "Password", type: "password" }
      },
    //   custom authorize design for auth logic
        async authorize (credentials:any):Promise<any> {
          await dbConnect();
          try {
            const user = await UserModel.findOne({
              $or: [
                { email: credentials.identifier },
                { username: credentials.identifier },
              ],
            });

            if (!user) {
              throw new Error("No user found with this email");
            }
            if(!user.isVerified){
                throw new Error("Please verify your account to login!");
            }

            const isPasswordCorrect = await bcrypt.compare(credentials.password,user.password);
            if(isPasswordCorrect){
                // after all check returning user is to be done
                return user;
            }else{
                throw new Error("Invalid credentials!")
            }

          } catch (error: any) {
            throw new Error(error);
          }
        },
      }),
  ],
  // need to customize 
  // this user comes from return of providers
  // token only have id of user, so we'll add more data in it and in session
  callbacks:{
    async jwt({ token, user}) {
        if(user){
            token._id = user._id?.toString();
            token.isVerified = user.isVerified;
            token.isAcceptingMessage = user.isAcceptingMessage;
            token.username = user.username;
        }
        return token
      },
    async session({ session, token }) {
        if(token){
            session.user._id = token._id;
            session.user.isVerified = token.isVerified;
            session.user.isAcceptingMessage = token.isAcceptingMessage;
            session.user.username = token.username;
        }
        return session
      },
  },
  // full signIn control to next, UI overwrite
  pages:{
    signIn:'/sign-in'
  },
  // one with token can login
  session:{
    strategy:"jwt"
  },
  secret:process.env.NEXTAUTH_SECRET
};
