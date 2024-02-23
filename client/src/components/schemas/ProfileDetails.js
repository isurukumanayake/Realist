import * as Yup from "yup";

export const ProfileDetailsSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Phone must be a 10-digit number"),
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters long"),
});
