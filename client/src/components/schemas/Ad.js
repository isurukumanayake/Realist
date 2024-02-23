import * as Yup from "yup";

export const AdSchema = Yup.object({
  address: Yup.string()
    .min(4, "Address is too short.")
    .max(100, "Address is too long.")
    .required("You must fill out this field."),
  bedrooms: Yup.number().when("categoryValue", {
    is: (val) => [101, 102, 104, 105].includes(Number(val)),
    then: () =>
      Yup.number()
        .min(0, "No less than 0")
        .max(200, "No more than 200")
        .required("You must fill out this field."),
  }),
  bathrooms: Yup.number().when("categoryValue", {
    is: (val) => [101, 102, 104, 105].includes(Number(val)),
    then: () =>
      Yup.number()
        .min(0, "No less than 0")
        .max(200, "No more than 200")
        .required("You must fill out this field.")
        .test(
          "is-valid-bathroom-value",
          "Invalid value",
          (value) => value % 0.5 === 0 || value % 1 === 0
        ),
  }),
  parkings: Yup.number().when("categoryValue", {
    is: (val) => [101, 102, 103, 105].includes(Number(val)),
    then: () =>
      Yup.number()
        .min(0, "No less than 0")
        .max(200, "No more than 200")
        .required("You must fill out this field."),
  }),
  landSize: Yup.number().when("categoryValue", {
    is: (val) => [100, 101].includes(Number(val)),
    then: () =>
      Yup.number()
        .min(0, "No less than 0")
        .max(1000000, "No more than 1000000")
        .required("You must fill out this field."),
  }),
  propertySize: Yup.number().when("categoryValue", {
    is: (val) => [101, 102, 103, 104, 105].includes(Number(val)),
    then: () =>
      Yup.number()
        .min(0, "No less than 0")
        .max(50000, "No more than 50000")
        .required("You must fill out this field."),
  }),
  subCategory: Yup.string().when("categoryValue", {
    is: (val) => [103, 104, 105].includes(Number(val)),
    then: () => Yup.string().required("You must fill out this field."),
  }),
  title: Yup.string()
    .min(5, "Title is too short.")
    .max(80, "Title is too long.")
    .required("You must fill out this field."),
  description: Yup.string()
    .min(10, "Description is too short.")
    .max(5000, "Description is too long.")
    .required("You must fill out this field."),
  price: Yup.number()
    .min(0, "No less than 0")
    .max(100000000, "No more than 100000000")
    .required("You must fill out this field."),
  photos: Yup.array()
    .min(1, "You must upload at least one photo.")
    .required("You must upload at least one photo."),
});
