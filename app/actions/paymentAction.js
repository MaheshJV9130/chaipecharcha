"use server";

import Razorpay from "razorpay";
import connectDb from "../database/db-con";
import Payments from "../models/Payments";


export const initiate = async (paymentForm) => {

  
  await connectDb();
  var instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RZR_ID,
    key_secret: process.env.NEXT_PUBLIC_RZR_SECRET,
  });
  const options = {
    amount: Number.parseInt(paymentForm.amount*100),
    currency: "INR",
  };

  const x = await instance.orders.create(options);
  await Payments.create({
    oid: x.id,
    amount:paymentForm.amount,
    toUser: paymentForm.toUser,
    fromUser : paymentForm.fromUser,
    message: paymentForm.message,
  });
  return x;
};
