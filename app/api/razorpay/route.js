import { NextResponse } from "next/server";
import connectDb from "@/app/database/db-con";
import Payments from "@/app/models/Payments";
import User from "@/app/models/User";
import {
  validatePaymentVerification,
  validateWebhookSignature,
} from "razorpay/dist/utils/razorpay-utils";

export async function POST(req) {
  await connectDb();
  let body = await req.formData();
  body = Object.fromEntries(body);


  let isOrderFoundInDB = await Payments.findOne({
    oid: body.razorpay_order_id,
  });
// Checking OID from DB
  if (!isOrderFoundInDB) {
    return NextResponse.json({
      status: "failed",
      message: "Order Id Not Found !",
    });
  }

// Getting RZR Secret Of User
const user = await User.find({username : isOrderFoundInDB.toUser})
const secret =  user[0].razorpaySecret

  let isPayment = validatePaymentVerification(
    { order_id: body.razorpay_order_id, payment_id: body.razorpay_payment_id },
    body.razorpay_signature,
    secret
  );
 if(isPayment){
  await Payments.findOneAndUpdate({oid : body.razorpay_order_id} , {isDone : true} , {new : true})
  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/${user[0].username.replace(' ', '_')}?payment=true`)
 }
  return NextResponse.json({ status: "Ok" });
}
