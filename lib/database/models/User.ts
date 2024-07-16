import { Schema, model } from "mongoose";
import { models } from "mongoose";

// const userSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     }, 
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     }, 
//     password: {
//         type: String,
//         required: true
//     }
// });

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String },
})

const User = models?.User || model('User', UserSchema);
export default User;