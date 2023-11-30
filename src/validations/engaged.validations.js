import * as yup from "yup";

export const engagedValidation = yup.object().shape({
  brideName: yup.string().required(),
  groomName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
});
