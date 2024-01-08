import * as yup from "yup";

export const authValidation = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});
