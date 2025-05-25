import * as yup from "yup";

const registerUserValidation = yup.object().shape({
  fullName: yup.string().required("Full Name is Required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is Required")
    .test(
      "has-dot-after-at",
      "Email must contain a dot (.) after the @",
      (value) => {
        if (!value) return false;
        const parts = value.split("@");
        return parts.length === 2 && parts[1].includes(".");
      }
    ),
  phone: yup
    .string()
    .required("Phone number is Required")
    .matches(/^\d+$/, "Phone must contain only digits"),
  password: yup.string().min(5).required("Password is Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
});
const resetValidation = yup.object().shape({
  password: yup.string().min(5).required("Password is Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
});

const loginUserValidation = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Required")
    .test(
      "has-dot-after-at",
      "Email must contain a dot (.) after the @",
      (value) => {
        if (!value) return false;
        const parts = value.split("@");
        return parts.length === 2 && parts[1].includes(".");
      }
    ),
  password: yup.string().required("Required"),
});

const otpValidation = yup.object().shape({
  otp: yup.string().required("Required"),
});

const emailValidation = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Required")
    .test(
      "has-dot-after-at",
      "Email must contain a dot (.) after the @",
      (value) => {
        if (!value) return false;
        const parts = value.split("@");
        return parts.length === 2 && parts[1].includes(".");
      }
    ),
});

const passwordlValidation = yup.object().shape({
  password: yup.string().min(5).required("Password is Required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Required"),
});

export {
  registerUserValidation,
  loginUserValidation,
  otpValidation,
  emailValidation,
  passwordlValidation,
  resetValidation,
};
