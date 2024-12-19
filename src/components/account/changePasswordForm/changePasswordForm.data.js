import * as Yup from "yup";

export const initialValues=()=> {
  return {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };
}

export const validationSchema=()=> {
  return Yup.object({
    password: Yup.string().required("Este campo es obligatorio"),
    newPassword: Yup.string().required("Este campo es obligatorio"),
    confirmNewPassword: Yup.string()
      .required("Este campo es obligatorio")
      .oneOf(
        [Yup.ref("newPassword")],
        "Las nuevas contraseñas tienen que ser iguales"
      ),
  });
}
