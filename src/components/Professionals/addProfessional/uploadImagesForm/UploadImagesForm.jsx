import React, { useState } from "react";
import { ScrollView, Alert, StyleSheet } from "react-native";
import { Icon, Avatar, Text } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { map, filter } from "lodash";
import { LoadingModal } from "../../../shared/loadingModal/LoadingModal";

export function UploadImagesForm(props) {
  const { formik } = props;
  const [isLoading, setIsLoading] = useState(false);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setIsLoading(true);
      console.log("OJO URI", result.assets[0].uri)
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
  
      const storage = getStorage();
      const storageRef = ref(storage, `professionals/${uuid()}`);
  
      console.log("Subiendo a Firebase...");
      const snapshot = await uploadBytes(storageRef, blob);
      console.log("Snapshot:", snapshot);
  
      await updatePhotosProfessional(snapshot.metadata.fullPath);
    } catch (error) {
      console.error("Error al subir la imagen a Firebase:", error);
      setIsLoading(false);
    }
  };

  const updatePhotosProfessional = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const imageUrl = await getDownloadURL(imageRef);

    formik.setFieldValue("images", [...formik.values.images, imageUrl]);

    setIsLoading(false);
  };

  const removeImage = (img) => {
    Alert.alert(
      "Eliminar imagen",
      "¿Estás segurdo de eliminar esta imagen?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            const result = filter(
              formik.values.images,
              (image) => image !== img
            );
            formik.setFieldValue("images", result);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <ScrollView
        style={styles.viewImage}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Icon
          type="material-community"
          name="camera"
          color="#a7a7a7"
          containerStyle={styles.containerIcon}
          onPress={openGallery}
        />

        {map(formik.values.images, (image) => (
          <Avatar
            key={image}
            source={{ uri: image }}
            containerStyle={styles.imageStyle}
            onPress={() => removeImage(image)}
          />
        ))}
      </ScrollView>
      <Text style={styles.error}>{formik.errors.images}</Text>

      <LoadingModal show={isLoading} text="Subiendo imagen" />
    </>
  );
}

const styles = StyleSheet.create({
    viewImage: {
      flexDirection: "row",
      marginHorizontal: 20,
      marginTop: 30,
    },
    containerIcon: {
      justifyContent: "center",
      marginRight: 10,
      backgroundColor: "#e3e3e3",
      width: 70,
      height: 70,
    },
    error: {
      marginHorizontal: 20,
      marginTop: 10,
      color: "#ff0000",
      fontSize: 12,
      paddingLeft: 6,
    },
    imageStyle: {
      width: 70,
      height: 70,
      marginRight: 10,
    },
  });