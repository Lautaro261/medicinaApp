import React from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initialValues, validationSchema } from "./changeGeneral.data";  
import  Toast  from "react-native-toast-message";

export const ChangeGeneralForm = (props) => {
  const { onClose, onReload } = props;
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  const formik = useFormik({
    initialValues: initialValues(),  
    validationSchema: validationSchema(), 
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, { 
          ...formValues, 
          registrationCompleted: true 
        }, { merge: true });

        Toast.show({
          type: 'success',
          text1: '✅ Información actualizada',
          text2: 'Tus datos se han actualizado correctamente.',
          visibilityTime: 3000, 
        });

        onReload();
        onClose();
      } catch (error) {
        console.error("Error al actualizar la información:", error);
        Toast.show({
          type: 'error',
          text1: '❌Error al actualizar',
          text2: 'Ocurrió un error al intentar actualizar la información.',

        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Dirección"
        rightIcon={{ type: "material-community", name: "map-marker", color: "#c2c2c2" }}
        onChangeText={(text) => formik.setFieldValue("address", text)}
        errorMessage={formik.errors.address}
      />
      <Input
        placeholder="Número de teléfono"
        keyboardType="phone-pad"
        rightIcon={{ type: "material-community", name: "phone", color: "#c2c2c2" }}
        onChangeText={(text) => formik.setFieldValue("phone", text)}
        errorMessage={formik.errors.phone}
      />
      <Input
        placeholder="DNI"
        keyboardType="number-pad"
        rightIcon={{ type: "material-community", name: "card-account-details", color: "#c2c2c2" }}
        onChangeText={(text) => formik.setFieldValue("dni", text)}
        errorMessage={formik.errors.dni}
      />
      <Button
        title="Actualizar información"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: { padding: 10 },
  btnContainer: { width: "100%", marginTop: 10 },
  btn: { backgroundColor: "#5c179b" },
});
