import * as Yup from "yup";

export const ChangePasswordSchema = Yup.object({
  password: Yup.string()
    .required("You must fill out this field")
    .min(6, "Password must contain at least 6 characters")
    .max(20, "Password must not exceed 20 characters"),
  confirmPassword: Yup.string()
    .required("You must fill out this field")
    .oneOf([Yup.ref("password"), null], "Passwords do not match"),
});
