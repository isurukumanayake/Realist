import * as Yup from "yup";

export const ContactSellerSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, "Invalid email address")
    .max(25, "Email must not exceed 25 characters")
    .required("Email is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Phone must be a 10-digit number"),
  message: Yup.string().required("Message is required"),
});
