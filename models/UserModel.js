import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      userName: {
         type: String,
      },
      email: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      name: String,
   },
   {
      timestamp: true,
   }
);

export default mongoose.model("users", userSchema);
