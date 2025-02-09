import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Avatar, Text } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const InfoUser = ({ setLoading, setLoadingText, userData }) => {

  const { uid, photoURL } = getAuth().currentUser;
  const [avatar, setAvatar] = useState(photoURL);
  const [firstName, setFirstName] = useState(userData.first_name || "Anónimo");
  const [lastName, setLastName] = useState(userData.last_name || "");

  useEffect(() => {
    if (userData) {
      setFirstName(userData.first_name || "Anónimo");
      setLastName(userData.last_name || "");
    }
  }, [userData]);

  const changeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    setLoadingText("Actualizando Avatar");
    setLoading(true);

    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage, `avatar/${uid}`);

    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotoUrl(snapshot.metadata.fullPath);
    });
  };

  const updatePhotoUrl = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    const imageUrl = await getDownloadURL(imageRef);

    const auth = getAuth();
    updateProfile(auth.currentUser, { photoURL: imageUrl });

    setAvatar(imageUrl);
    setLoading(false);
  };

  return (
    <View style={styles.content}>
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        icon={{ type: "material", name: "person" }}
        source={{ uri: avatar }}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>

      <View>
        <Text style={styles.displayName}>{`${firstName} ${lastName}` || "Anónimo"}</Text>
        <Text>{getAuth().currentUser.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 30,
  },
  avatar: {
    marginRight: 20,
    backgroundColor: "green",
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});