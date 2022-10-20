import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = ({ req }) => {
   const autheader = req.headers.authorization;
   const token = autheader.split(" ")[1];
   console.log(token);

   if (!token) {
      throw new AuthenticationError("auth header must be use");
   }

   jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
         throw new AuthenticationError("token is not valid");
      }
      req.user = user;
      return user;
   });
};
