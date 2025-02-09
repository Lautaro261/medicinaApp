import * as Yup from "yup";

export const initialValues = () => {
  return {
    first_name: "",
    last_name: "",
  };
};

export const validationSchema = () => {
  return Yup.object({
    first_name: Yup.string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .required("El nombre es obligatorio"),
    last_name: Yup.string()
      .min(2, "El apellido debe tener al menos 2 caracteres")
      .required("El apellido es obligatorio"),
  });
};

