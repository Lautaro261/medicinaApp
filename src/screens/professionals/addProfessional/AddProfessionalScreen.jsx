import React from "react";
import { ScrollView, StyleSheet} from "react-native";
import { Button } from "@rneui/themed";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";


import { InfoForm } from "../../../components/Professionals/addProfessional/InfoForm/InfoForm";
import { UploadImagesForm } from "../../../components/Professionals/addProfessional/uploadImagesForm/UploadImagesForm";
import { ImageProfessional } from "../../../components/Professionals/addProfessional/imageProfessional/ImageProfessional";

import { db } from '../../../utils/firebase';
import { initialVales, validationSchema } from "./AddProfessional.data";

export function AddProfessionalScreen() {
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialVales(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        newData.id = uuid();
        newData.createdAt = new Date();
        console.log(newData);

        await setDoc(doc(db, "professionals", newData.id), newData);

        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
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
    backgroundColor: "#F3EAFB",
    margin: 20,
  },
});



/* const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F3EAFB', // Color coherente con LoginForm
    },
    scrollContainer: {
      padding: 16,
    },
    button: {
      marginTop: 16,
      backgroundColor: '#7B2CBF',
      borderColor: '#7B2CBF',
      borderRadius: 8,
    },
  }); */