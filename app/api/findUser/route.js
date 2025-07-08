import connectDb from "@/app/database/db-con";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export const POST = async(req)=>{
   let body = await req.json()
   await connectDb()
   let userExists = await User.find({username : body.username})
   return NextResponse.json(userExists)
}
