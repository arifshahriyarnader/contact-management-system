import mongoose from "mongoose";

const connectDB =async ()  =>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("MongoDB is Connected")
      } catch (error) {
        throw error;
      }
}

mongoose.connection.on("disconnected", () =>{
    console.log("mongoDB disconnected")
})

export default connectDB;