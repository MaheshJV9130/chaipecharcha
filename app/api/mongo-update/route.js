import connectDb from "@/app/database/db-con";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import Payments from "@/app/models/Payments";

export async function POST(req) {
  const data = await req.json();

  try {
    await connectDb();

    // Update related payments to new username
    await Payments.updateMany(
      { toUser: data.oldUsername },
      { $set: { toUser: data.username } }
    );

    // Check if username is taken by another user
    const isUsernameTaken = await User.find({ username: data.username });

    // Allow update if it's same as before or not taken
    if (isUsernameTaken.length === 0 || data.username === data.oldUsername) {
      await User.updateOne(
        { email: data.email },
        {
          $set: {
            username: data.username,
            razorpayId: data.razorpayId,
            razorpaySecret: data.razorpaySecret,
            profilePic: data.profilePic,
          },
        }
      );
    } else {
      return NextResponse.json({
        status: 400,
        ok: false,
        error: "Username already taken",
      });
    }

    return NextResponse.json({ status: 200, ok: true });
  } catch (error) {
    console.error("Error in /api/mongo-update:", error);
    return NextResponse.json({ status: 500, ok: false, error: error.message });
  }
}
