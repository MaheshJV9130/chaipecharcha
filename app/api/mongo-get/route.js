import connectDb from "@/app/database/db-con";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  try {
   await connectDb();
    let a = await User.findOne({ email: data.email });
    return NextResponse.json(a);
  } catch {
    return NextResponse.json({ status: 500, ok: false });
  }
}
