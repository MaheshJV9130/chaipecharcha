import mongoose from "mongoose";

async function connectDb(){
    try{
        const connect = await mongoose.connect(process.env.DB_URL);
    }
    catch(error){
        console.log(error.message)
      
    }
}

export default connectDb