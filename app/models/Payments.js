import mongoose, { model, Schema } from "mongoose";

const paymentsSchema = new Schema({
  fromUser : {type : String , require : true} ,
  toUser: { type: String, required: true },
  oid: { type: String, required: true },
  message: { type: String },
  amount: { type: Number, required: true },
  time: { type: Date, default: Date.now() },
  isDone: { type: Boolean, default: false },
});

export default mongoose.models.Payments || model("Payments", paymentsSchema);
