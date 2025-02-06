/* import * as Yup from "yup";

export const initialValues = ()=> {
  return {
    name:"",
    email: "",
    password: "",
    repeatPassword: "",
  };
}

export const validationSchema = ()=> {
  return Yup.object({
    email: Yup.string()
      .email("El email no es correcto")
      .required("El email es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
    repeatPassword: Yup.string()
      .required("La contraseña es obligatoria")
      .oneOf([Yup.ref("password")], "Las contraseñas tienen que ser iguales"),
  });
} */

  import * as Yup from "yup";

export const initialValues = () => {
  return {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    email: Yup.string()
      .email("El email no es correcto")
      .required("El email es obligatorio"),
    password: Yup.string()
      .min(3, "La contraseña debe tener al menos 3 caracteres")
      .required("La contraseña es obligatoria"),
    confirmPassword: Yup.string()
      .required("Debes confirmar la contraseña")
      .oneOf([Yup.ref("password")], "Las contraseñas no coinciden"),
  });
};
