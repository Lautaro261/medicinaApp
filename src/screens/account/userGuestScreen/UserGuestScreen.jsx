import React from "react";
import { ScrollView, StyleSheet, Image } from "react-native";
import { Text, Button, Layout } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/ScreenName";

export const UserGuestScreen = () => {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate(screen.account.login);
  };

  return (
    <Layout style={styles.container}>
      {/* Contenedor principal con desplazamiento */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Imagen ilustrativa */}
        <Image
          source={require("../../../../assets/img/undraw_add-information_06qr.png")}
          style={styles.image}
        />
        {/* Título de la pantalla */}
        <Text category="h5" style={styles.title}>
          Consultar tu perfil de AppCogniKids
        </Text>
        {/* Descripción de la funcionalidad */}
        <Text category="p1" style={styles.description}>
          ¿Cómo describirías a los mejores profesionales? Busca y visualiza los mejores
          servicios de una forma sencilla, vota cuál te ha gustado más y
          comenta cómo ha sido tu experiencia.
        </Text>

        {/* Botón para ir a la pantalla de inicio de sesión */}
        <Button
        style={styles.btnStyle}
        onPress={goToLogin}
        activeOpacity={0.7}
        appearance='filled'
        >
          Ver tu perfil
        </Button>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3EAFB",
  },
  content: {
    paddingHorizontal: 30,
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
    height: 300,
    width: "100%",
    marginBottom: 40,
    borderRadius: 20,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  btnStyle: {
    backgroundColor: "#7B2CBF",
    borderColor: "#7B2CBF",
    paddingVertical: 10,
    borderRadius: 8,
    width: "80%",
    marginTop: 20,
  },
});
