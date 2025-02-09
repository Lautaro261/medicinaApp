import React, { useState } from "react";
import { StyleSheet, View, Alert, Modal, Button } from "react-native";
import { Input, CheckBox } from "@rneui/themed";
import {WebView} from "react-native-webview";
import { handleIntegrationMP } from "../../../../utils/mercadoPago";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { MapForm } from "../mapForm/MapForm";
//TODO: Arreglar el pago.

export const InfoForm = (props) => {
  const { formik } = props;
  const [showMap, setShowMap] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");

  const onOpenCloseMap = () => setShowMap((prevState) => !prevState);

  // Manejo del pago
  const handlePayment = async () => {
    try {
      // Obtén el link de pago
      const url = await handleIntegrationMP();
      setPaymentUrl(url);
      setShowPayment(true);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un problema al iniciar el pago.");
    }
  };

  // Actualiza Firestore cuando el pago sea exitoso
  const updateFirestore = async () => {
    try {
      const db = getFirestore();
      const professionalDoc = doc(db, "professionals", formik.values.id); // Cambia "id" por el identificador en Firestore
      await updateDoc(professionalDoc, { verified: true });
      Alert.alert("Éxito", "El estado de verificación se actualizó.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo actualizar la base de datos.");
    }
  };

  return (
    <>
      <View style={styles.content}>
        <Input
          placeholder="Titulo del Servicio"
          onChangeText={(text) => formik.setFieldValue("name", text)}
          errorMessage={formik.errors.name}
        />
        <Input
          placeholder="Dirección"
          rightIcon={{
            type: "material-community",
            name: "map-marker-radius",
            color: getColorIconMap(formik),
            onPress: onOpenCloseMap,
          }}
          onChangeText={(text) => formik.setFieldValue("address", text)}
          errorMessage={formik.errors.address}
        />
        <Input
          placeholder="Telefono"
          keyboardType="numeric" // Abre el teclado numérico
          onChangeText={(text) => formik.setFieldValue("phone", text)}
          errorMessage={formik.errors.phone}
        />
        <Input
          placeholder="Email"
          keyboardType="email-address" // Abre el teclado con el @
          onChangeText={(text) => formik.setFieldValue("email", text)}
          errorMessage={formik.errors.email}
        />
        <Input
          placeholder="Descripcion del servicio"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChangeText={(text) => formik.setFieldValue("description", text)}
          errorMessage={formik.errors.description}
        />

      </View>

      {/* Modal con WebView para el pago */}
      <Modal visible={showPayment} animationType="slide">
        <WebView
          source={{ uri: paymentUrl }}
          onNavigationStateChange={(navState) => {
            // Detecta redirección a la URL de éxito
            if (navState.url.includes("success")) {
              setShowPayment(false);
              formik.setFieldValue("verified", true); // Actualiza el estado local
              updateFirestore(); // Guarda en Firestore
              Alert.alert("Éxito", "¡Pago exitoso!");
            } else if (navState.url.includes("failure")) {
              setShowPayment(false);
              Alert.alert("Error", "El pago falló. Inténtalo nuevamente.");
            }
          }}
        />
        <Button title="Cerrar" onPress={() => setShowPayment(false)} />
      </Modal>

      <MapForm show={showMap} close={onOpenCloseMap} formik={formik} />
    </>
  );
};

const getColorIconMap = (formik) => {
  if (formik.errors.location) return "#ff0000";

  if (formik.values.location) return "#00a680";

  return "#c2c2c2";
};

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
});


/* const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F3EAFB', // Fondo coherente con el tema
    borderRadius: 8,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: '#D0B3F1',
    borderWidth: 1,
    paddingHorizontal: 12,
  },
}); */