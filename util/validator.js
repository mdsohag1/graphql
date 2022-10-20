export const validateRegister = (username, email, password, confirmPass) => {
   const errors = {};
   if (username.trim() === "") {
      errors.username = "username is must not be empty";
   }
   if (email.trim() === "") {
      errors.email = "Email is must not be empty";
   } else {
      const regEx =
         /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
      if (!email.match(regEx)) {
         errors.email = "Email must be a valid email address";
      }
   }
   if (password.trim() === "") {
      errors.password = "Password must not empty";
   } else if (password !== confirmPass) {
      errors.confirmPass = "confirmPass is not match";
   }
   return {
      errors,
      valid: Object.keys(errors).length < 1,
   };
};

export const validateLogin = (email, password) => {
   const errors = {};
   if (email.trim() === "") {
      errors.email = "Email is must not be empty";
   }
   if (password.trim() === "") {
      errors.password = "Password must not empty";
   }
   return {
      errors,
      valid: Object.keys(errors).length < 1,
   };
};
