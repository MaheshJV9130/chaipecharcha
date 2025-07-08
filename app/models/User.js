import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    username :{type :String , required : true},
    email: {type :String , required : true , },
    razorpayId : {type :String },
    razorpaySecret : {type :String },
    profilePic : {type : String}
})

export default mongoose.models.User || model("User", userSchema)