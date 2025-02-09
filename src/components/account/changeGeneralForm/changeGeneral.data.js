import * as Yup from "yup";

// Función para inicializar los valores
export const initialValues = () => {
  return {
    address: "",
    phone: "",
    dni: "",
  };
};

// Función para el esquema de validación
export const validationSchema = () => {
  return Yup.object({
    address: Yup.string().required("La dirección es obligatoria"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Solo números")
      .min(10, "Debe tener al menos 10 dígitos")
      .required("El número de teléfono es obligatorio"),
    dni: Yup.string()
      .matches(/^[0-9]+$/, "Solo números")
      .length(8, "El DNI debe tener 8 dígitos")
      .required("El DNI es obligatorio"),
  });
};
