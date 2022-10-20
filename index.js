import mongoose from "mongoose";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";

import dotenv from "dotenv";
dotenv.config();

const server = new ApolloServer({
   typeDefs,
   resolvers,
   context: ({ req }) => {
      const user = req.user || null;
      return { user };
   },
   plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

mongoose
   .connect(process.env.DB_URL, { useNewUrlParser: true })
   .then(() => {
      console.log("mongodb connected");
      return server.listen();
   })
   .then(({ url }) => {
      console.log(`the server is running at ${url}`);
   });
