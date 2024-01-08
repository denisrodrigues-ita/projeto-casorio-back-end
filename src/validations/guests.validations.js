import * as yup from "yup";

export const guestsValidation = yup.object().shape({
  name: yup.string().required(),
  code: yup.string().required(),
});
