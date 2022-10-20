import { gql } from "apollo-server";

const typeDefs = gql`
   type Post {
      id: ID!
      desc: String!
      userId: String!
      img: String!
   }
   type User {
      id: ID!
      userName: String!
      email: String!
      token: String!
      name: String!
   }
   input RegisterInput {
      email: String!
      password: String!
      confirmPass: String!
      name: String!
      userName: String!
   }
   type Query {
      getPosts: [Post]
      getPost(postId: ID!): Post
   }
   type Mutation {
      register(registerInput: RegisterInput): User!
      login(email: String!, password: String!): User!
      createPost(desc: String!, img: String!, userId: String): Post!
      deletePost(postId: ID!): String!
   }
`;

export default typeDefs;
