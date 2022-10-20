import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
   {
      desc: {
         type: String,
         required: true,
      },
      userId: {
         type: String,
         required: true,
      },
      img: {
         type: String,
         required: true,
      },
   },
   {
      timestamp: true,
   }
);

export default mongoose.model("posts", PostSchema);
