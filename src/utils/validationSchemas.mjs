export const createUserValidationSchema = {
  username: {
    isLength: {
      errorMessage:
        "Username should be minimum 5 Character and maximum 32 character",
      options: { min: 5, max: 32 },
    },
  },
  notEmpty: {
    errorMessage: "Username cannot be empty",
  },
  isString: {
    errorMessage: "Username should be string",
  },
  displayName: {
    notEmpty: {
      errorMessage: "Display Name cannot be empty",
    },
  },
};
