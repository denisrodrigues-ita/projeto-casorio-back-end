import * as yup from "yup";

export const engagedValidation = yup.object().shape({
  bride_name: yup.string().required(),
  groom_name: yup.string().required(),
  email: yup.string().email().required(),
});
