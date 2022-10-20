import PostModal from "../../models/PostModel.js";
import { verifyToken } from "../../util/cheakAuth.js";

export const postResolvers = {
   Query: {
      async getPosts() {
         try {
            const posts = await PostModal.find();
            return posts;
         } catch (error) {
            throw new Error(error);
         }
      },
      async getPost(_, { postId }) {
         try {
            const post = await PostModal.findById(postId);
            if (post) {
               return post;
            } else {
               throw new Error("post is not found");
            }
         } catch (error) {
            throw new Error(error);
         }
      },
   },
   Mutation: {
      async createPost(_, { desc, img, userId }, { req }) {
         console.log(req.headers.authorization);
         const newPost = new PostModal({
            desc: desc,
            userId: user.id,
            img: img,
         });
         const post = newPost.save();
         return post;
      },
   },
};
