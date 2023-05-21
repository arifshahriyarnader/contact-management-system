import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "name is required"]
    },
    email:{
        type: String,
        required: [true, "email is required"]
    },
    password:{
        type: String,
        required: [true, "password is required"]
    },
})
export default mongoose.model("User", UserSchema);