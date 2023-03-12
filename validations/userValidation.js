import yup from "yup";

export const userLogInSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(12).required(),
});
