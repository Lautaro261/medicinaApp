import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { initialValues, validationSchema } from "./changeGeneral.data";
import Toast from "react-native-toast-message";

export const ChangeGeneralForm = ({ onClose, onReload }) => {

  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;
  
  const [userData, setUserData] = useState(null); // Estado para los datos del usuario
  const [loading, setLoading] = useState(true); // Estado para mostrar el loader

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      try {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } catch (error) {
        console.error("Error obteniendo datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const formik = useFormik({
    initialValues: initialValues(userData), // Ahora usa los datos del usuario
    enableReinitialize: true, // Permite reinicializar cuando `userData` cambia
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, { 
          ...formValues, 
          dni: parseInt(formValues.dni, 10), // Convertir a número
          registrationCompleted: true 
        }, { merge: true });

        Toast.show({
          type: "success",
          text1: "✅ Información actualizada",
          text2: "Tus datos se han actualizado correctamente.",
          visibilityTime: 3000, 
        });

        onReload();
        onClose();
      } catch (error) {
        console.error("Error al actualizar la información:", error);
        Toast.show({
          type: "error",
          text1: "❌ Error al actualizar",
          text2: "Ocurrió un error al intentar actualizar la información.",
        });
      }
    },
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5c179b" />
      </View>
    );
  }

  return (
    <View style={styles.content}>
      <Input
        placeholder="Dirección"
        value={formik.values.address}
        rightIcon={{ type: "material-community", name: "map-marker", color: "#c2c2c2" }}
        onChangeText={(text) => formik.setFieldValue("address", text)}
        errorMessage={formik.errors.address}
      />
      <Input
        placeholder="Número de teléfono"
        keyboardType="phone-pad"
        value={formik.values.phone}
        rightIcon={{ type: "material-community", name: "phone", color: "#c2c2c2" }}
        onChangeText={(text) => formik.setFieldValue("phone", text)}
        errorMessage={formik.errors.phone}
      />
      <Input
        placeholder="DNI"
        keyboardType="number-pad"
        value={formik.values.dni}
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
  content: { 
    padding: 10
  },
  btnContainer: { 
    width: "100%", 
    marginTop: 10 
  },
  btn: { 
    backgroundColor: "#5c179b"
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 
    "center", 
    alignItems: "center"
  },
});
