import { NextResponse } from "next/server";
import connectDb from "@/app/database/db-con";
import Payments from "@/app/models/Payments";

export const POST = async(req)=>{
  const body = await req.json()
  await connectDb()
  let getPayments = await Payments.find({toUser:body.username})
  if(getPayments){
    return NextResponse.json(getPayments)
  }else{
    return NextResponse.json({ done : 'No Paymets Found'})
  }
}