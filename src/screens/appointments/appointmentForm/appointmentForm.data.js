import * as Yup from "yup";

export const initialValues = {
  fullName: "",
  dni: "",
  phone: "",
};

export const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .trim()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(50, "El nombre no puede superar los 50 caracteres"),
    //.required("El nombre es obligatorio"),
  
  dni: Yup.string()
    .matches(/^\d{6,8}$/, "El DNI debe tener entre 6 y 8 dígitos"),
    //.required("El DNI es obligatorio"),
  
  phone: Yup.string()
    .matches(/^\d{10}$/, "El teléfono debe tener 9 dígitos") //TODO: arreglar el control de cantidad de digitos
    //.required("El teléfono es obligatorio"),
});
