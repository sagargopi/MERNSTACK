import mongoose from "mongoose";
export const connectDB =async()=>{
    await mongoose.connect('mongodb+srv://Hitesh707:Hitesh987@cluster0.unn3h.mongodb.net/project').then(()=>console.log("DB Connected"));
}