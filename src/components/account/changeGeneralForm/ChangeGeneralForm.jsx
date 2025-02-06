import React from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import * as Yup from "yup";

export const ChangeGeneralForm = (props) => {
  const { onClose, onReload } = props;
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  const formik = useFormik({
    initialValues: {
      address: "",
      phone: "",
      dni: "",
    },
    validationSchema: Yup.object({
      address: Yup.string().required("La dirección es obligatoria"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Solo números")
        .min(10, "Debe tener al menos 10 dígitos")
        .required("El número de teléfono es obligatorio"),
      dni: Yup.string()
        .matches(/^[0-9]+$/, "Solo números")
        .length(8, "El DNI debe tener 8 dígitos")
        .required("El DNI es obligatorio"),
    }),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, { 
          ...formValues, 
          registrationCompleted: true 
        }, { merge: true });

        onReload();
        onClose();
      } catch (error) {
        console.error("Error al actualizar la información:", error);
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
  btn: { backgroundColor: "#0288d1" },
});
