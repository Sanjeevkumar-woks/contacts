//contacts Validation Schema
import yup from "yup";

export const contactsValidation = yup.object({
  name: yup
    .object({
      firstName: yup.string().required,
      middleName: yup.string(),
      lastName: yup.string().required(),
    })
    .required(),
  DOB: yup.string().required(),
  email: yup.string().required(),
  phone: yup.number().required(),
  occupation: yup.string(),
  company: yup.string(),
  password: yup.string().required(),
});
