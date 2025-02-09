import React from "react";
import { View, StyleSheet } from "react-native";
import { AirbnbRating, Input } from "@rneui/themed";
import { Button } from "@ui-kitten/components";
import Toast from "react-native-toast-message"; 
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { map, mean } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../../utils/firebase";
import { initialValues, validationSchema } from "./AddReviewProfessional.data";

export const AddReviewProfessionalScreen = (props) => {
  const { route } = props;
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const idDoc = uuid();
        const newData = formValue;
        newData.id = idDoc;
        newData.idProfessional = route.params.idProfessional;
        newData.idUser = auth.currentUser.uid;
        newData.avatar = auth.currentUser.photoURL;
        newData.createdAt = new Date();

        await setDoc(doc(db, "reviews", idDoc), newData);
        await updateProfessional(); // Actualiza el ratingMedia después de agregar la reseña
        formik.resetForm(); 
        Toast.show({
          type: "success",
          text1: "😄Gracias por valorar!",
        });
        navigation.goBack(); 
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "❌ Error al enviar tu comentario", 
        });
      }
    },
  });

  const updateProfessional = async () => {
    const q = query(
      collection(db, "reviews"),
      where("idProfessional", "==", route.params.idProfessional)
    );

    onSnapshot(q, async (snapshot) => {
      const reviews = snapshot.docs;
      const arrayStars = map(reviews, (review) => review.data().rating);

      const media = arrayStars.length > 0 ? mean(arrayStars) : 0; // Calcular media solo si hay reseñas

      const professionalRef = doc(db, "professionals", route.params.idProfessional); // Cambiado a idProfessional

      await updateDoc(professionalRef, {
        ratingMedia: media,
      });
    });
  };

  return (
    <View style={styles.content}>
      <View>
        <View style={styles.ratingContent}>
          <AirbnbRating
            count={5}
            reviews={["Pesimo", "Deficiente", "Normal", "Muy bueno", "Excelente"]}
            defaultRating={formik.values.rating}
            size={35}
            onFinishRating={(rating) => formik.setFieldValue("rating", rating)}
          />
        </View>

        <View>
          <Input
            placeholder="Titulo"
            onChangeText={(text) => formik.setFieldValue("title", text)}
            errorMessage={formik.errors.title}
          />
          <Input
            placeholder="Comentario"
            multiline
            inputContainerStyle={styles.comment}
            onChangeText={(text) => formik.setFieldValue("comment", text)}
            errorMessage={formik.errors.comment}
          />
        </View>
      </View>

      <Button
        style={styles.btn} 
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
        appearance="filled"
        activeOpacity={0.7}
      >
        Comentar
      </Button>

    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: "space-between",
    backgroundColor: "#F3EAFB", 
  },
  ratingContent: {
    height: 160,
    justifyContent: "center",
  },
  comment: {
    height: 150,
  },
  btn: {
    backgroundColor: "#7B2CBF",
    marginBottom: 20, //TODO: agregar color a borde del boton y ver el color del fondo, no se muestra completo.
  },
});

//TODO: cambiar date por Timestamp.now()