import * as Yup from "yup";

export const initialValues=()=> {
    return {
      email: "",
      password: "",
    };
  }
  
  export const validationSchema=()=> {
    return Yup.object({
      email: Yup.string()
        .email("El email no es valido")
        .required("El email es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    });
  }
  