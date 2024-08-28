import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    pnr:{type:Number,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}},
    expiresAt: { type: Date, required: true }

},{minimize:false})
const userModel =mongoose.models.user || mongoose.model("user",userSchema);
userSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export default userModel;