import * as Yup from "yup";

export const RegisterSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Invalid email address")
    .max(25, "Email must not exceed 25 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must contain at least 6 characters")
    .max(20, "Password must not exceed 20 characters")
    .required("Password is required"),
});
