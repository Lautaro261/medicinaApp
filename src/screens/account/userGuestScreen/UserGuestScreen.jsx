import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Text, Button, Image } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/ScreenName";


export const UserGuestScreen = ()=> {
  const navigation = useNavigation();

   const goToLogin = () => {
    navigation.navigate(screen.account.login);
  };

  return (
    <ScrollView centerContent={true} style={styles.content}>
      <Image
        source={require("../../../../assets/img/user-guest.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Consultar tu perfil de AppCogniKids
      </Text>
      <Text style={styles.description}>
        ¿Como describirías tu mejor profesionales? Busca y visualiza los mejores
        servicios de una forma sencilla, vota cual te ha gustado más y
        comenta como ha sito tu experiencia.
      </Text>

      <Button
        title="Ver tu perfil"
        onPress={goToLogin}
        buttonStyle={styles.btnStyle}
      />
    </ScrollView>
  );
}

 const styles = StyleSheet.create({
    content: {
      marginHorizontal: 30,
    },
    image: {
      resizeMode: "contain",
      height: 300,
      width: "100%",
      marginBottom: 40,
    },
    title: {
      fontWeight: "bold",
      fontSize: 19,
      marginBottom: 10,
      textAlign: "center",
    },
    description: {
      textAlign: "center",
      marginBottom: 20,
    },
    btnStyle: {
      backgroundColor: "#7B2CBF",
    },
  });