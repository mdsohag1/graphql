import UserModel from "../../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server-core";
import { validateRegister, validateLogin } from "./../../util/validator.js";

const genarateToken = (user) => {
   const token = jwt.sign(
      {
         id: user._id,
         email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
   );
   return `Berer ${token}`;
};

export const userResolvers = {
   Mutation: {
      async login(_, { email, password }) {
         const { errors, valid } = validateLogin(email, password);
         if (!valid) {
            throw new UserInputError("Errors", { errors });
         }
         const user = await UserModel.findOne({ email });
         if (!user) {
            throw new UserInputError("user not found");
         }
         const match = await bcrypt.compare(password, user.password);
         if (!match) {
            errors.general = "wrong creadintial";
            throw new UserInputError("wrong creadintial", { errors });
         }
         const token = genarateToken(user);
         return { ...user._doc, id: user._id, token };
      },

      async register(
         _,
         { registerInput: { email, password, confirmPass, userName, name } },
         context,
         info
      ) {
         const { valid, errors } = validateRegister(
            userName,
            email,
            password,
            confirmPass
         );
         if (!valid) {
            throw new UserInputError("errors", { errors });
         }

         const user = await UserModel.findOne({ email: email });
         if (user) {
            throw new UserInputError("user already taken", { errors });
         }

         password = await bcrypt.hash(password, 10);
         const newUser = await new UserModel({
            email,
            name,
            password,
            userName,
         });

         const res = await newUser.save();

         const token = genarateToken(res);

         return { ...res._doc, id: res._id, token };
      },
   },
};
