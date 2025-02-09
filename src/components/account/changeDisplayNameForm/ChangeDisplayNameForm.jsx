import React from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Toast from "react-native-toast-message"; 
import { initialValues, validationSchema } from "./changeDisplayNameForm.data";

export const ChangeDisplayNameForm = ({ onClose, onReload }) => {
  const db = getFirestore();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { first_name, last_name } = formValue;
        const currentUser = getAuth().currentUser;
        const userRef = doc(db, "users", currentUser.uid);

        await setDoc(userRef, { first_name, last_name }, { merge: true });

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
        placeholder="Nombre"
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("first_name", text)}
        errorMessage={formik.errors.first_name}
      />
      <Input
        placeholder="Apellidos"
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("last_name", text)}
        errorMessage={formik.errors.last_name}
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