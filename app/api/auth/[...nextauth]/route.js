import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import mongoose from "mongoose";
import Payments from "@/app/models/Payments";
import User from "@/app/models/User";
import connectDb from "@/app/database/db-con";

export const authOptions = NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      await connectDb();

      const loggedUser = await User.findOne({ email: session.user.email });
      if (loggedUser) {
        session.user.email = loggedUser.email;
        session.user.name = loggedUser.username;
        if(loggedUser.profilePic){

          session.user.image = loggedUser.profilePic;
        }
      } else {
        
        const newUser = new User({
          email: session.user.email,
          username: session.user.name.replace(' ','_').concat('_'+Math.floor(Math.random()*99 + 10)),
          profilePic : session.user.image
        });
        await newUser.save();
        
      }
      return session;
    },
  },
});

export { authOptions as GET, authOptions as POST };
