import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string().required("Enter an email"),
  password: Yup.string().required("Enter a password"),
});
