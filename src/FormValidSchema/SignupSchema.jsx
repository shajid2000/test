import * as Yup from "yup";

export const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  phone: Yup.string().min(10).max(10).required("Please enter a valid No."),
  email: Yup.string().email().required("Please enter valid email"),
  password: Yup.string()
    .min(6)
    .required("Please enter your password atleast 6"),
});
