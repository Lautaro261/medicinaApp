import React from "react";
import { View, StyleSheet } from "react-native";
import { AirbnbRating, Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
//import Toast from "react-native-toast-message";
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


export const AddReviewProfessionalScreen =(props)=> {
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
        await updateProfessional();
      } catch (error) {
/*         Toast.show({
          type: "error",
          position: "bottom",
          text1: "Errro al enviar la review",
        }); */
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

      const media = mean(arrayStars);

      const professionalRef = doc(db, "professionals", route.params.idRestaurant);

      await updateDoc(professionalRef, {
        ratingMedia: media,
      });

      navigation.goBack();
    });
  };

  return (
    <View style={styles.content}>
      <View>
        <View style={styles.ratingContent}>
          <AirbnbRating
            count={5}
            reviews={[
              "Pesimo",
              "Deficiente",
              "Normal",
              "Muy bueno",
              "Excelente",
            ]}
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
        title="Enviar review"
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
      flex: 1,
      marginHorizontal: 15,
      justifyContent: "space-between",
    },
    ratingContent: {
      height: 160,
      justifyContent: "center",
    },
    comment: {
      height: 150,
    },
    btnContainer: {
      marginBottom: 20,
    },
    btn: {
      backgroundColor: "#00a680",
    },
  });
  