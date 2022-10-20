import { postResolvers } from "./postResolvers.js";
import { userResolvers } from "./userResolvers.js";

const resolvers = {
   Query: {
      ...postResolvers.Query,
   },
   Mutation: {
      ...userResolvers.Mutation,
      ...postResolvers.Mutation,
   },
};

export default resolvers;
