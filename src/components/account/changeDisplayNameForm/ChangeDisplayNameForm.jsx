import React from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import { getAuth, updateProfile } from "firebase/auth";
import Toast from "react-native-toast-message"; 
import { initialValues, validationSchema } from "./changeDisplayNameForm.data";

export const ChangeDisplayNameForm = (props) => {
  const { onClose, onReload } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { displayName } = formValue;
        const currentUser = getAuth().currentUser;
        console.log("USER", currentUser);
        console.log("NAME", displayName);
        await updateProfile(currentUser, { displayName });

        onReload();
        onClose();
        Toast.show({ // Mostrar Toast en caso de éxito
          type: "success",
          text1: "✅ Nombre cambiado con éxito",
        });
      } catch (error) {
        console.log('Error: ', error);
        Toast.show({ // Mostrar Toast en caso de error
          type: "error",
          text1: "❌ Error al cambiar el nombre",
        });
      }
    },

  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Nombre y apellidos"
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("displayName", text)}
        errorMessage={formik.errors.displayName}
      />
      <Button
        title="Cambiar nombre y apellidos"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    paddingVertical: 10,
  },
  btnContainer: {
    width: "95%",
    marginTop: 10,
  },
  btn: {
    backgroundColor: "#5c179b",
  },
});