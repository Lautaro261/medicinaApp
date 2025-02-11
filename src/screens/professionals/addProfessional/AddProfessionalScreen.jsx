import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { useFormik } from "formik";
import { createProfessionalAndSlots } from "../../../utils/createProfessional"; 

import { InfoForm } from "../../../components/Professionals/addProfessional/InfoForm/InfoForm";
import { UploadImagesForm } from "../../../components/Professionals/addProfessional/uploadImagesForm/UploadImagesForm";
import { ImageProfessional } from "../../../components/Professionals/addProfessional/imageProfessional/ImageProfessional";

import { initialVales, validationSchema } from "./AddProfessional.data";
import { screen } from "../../../utils/ScreenName";
import { useNavigation } from "@react-navigation/native";

export function AddProfessionalScreen() {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialVales(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {

      await createProfessionalAndSlots(formValue, 1, "10:00", "15:00"); // Llamada a la función para crear profesional y turnos

      navigation.navigate(screen.professional.verificationProfessional);
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageProfessional formik={formik} />
      <InfoForm formik={formik} />
      <UploadImagesForm formik={formik} />

      <Button
        title="Crear Servicio"
        buttonStyle={styles.addRestaurant}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  addRestaurant: {
    backgroundColor: "#972bf6",
    margin: 20,
  },
});


//TODO: agregar Tost en caso de error.
