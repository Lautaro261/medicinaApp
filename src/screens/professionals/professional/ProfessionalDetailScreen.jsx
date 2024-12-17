import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Text, Button, Card, Icon } from "@ui-kitten/components";
//import { Carousel } from "../../../components/shared/carousel/Carousel";


const { width } = Dimensions.get("window");

export const ProfessionalDetailsScreen = ({ route }) => {
  // Obtener la información del profesional desde los parámetros de navegación
  const { professional } = route.params;

  useEffect(() => {
    console.log(professional);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* <Carousel /> */}
       <Card style={styles.card}>
        <View style={styles.header}>
            {/* <Icon name="person-outline"  />  */}
          <Text category="h1" style={styles.name}>
            {professional.name}
          </Text>
        </View>
        <Text category="s1" style={styles.specialty}>
          Especialidad: {professional.specialty}
        </Text>
        <Text category="s2" style={styles.location}>
          Ubicación: {professional.location}
        </Text>
        <Text category="p1" style={styles.description}>
          Descripción: {professional.description}
        </Text>
        <Button style={styles.button} onPress={() => console.log("Llamar al profesional")}>
          Llamar
        </Button>
      </Card> 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3EAFB", // Fondo morado claro
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#FFF",
    borderColor: "#D0B3F1", // Morado claro en bordes
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  name: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#5A189A", // Morado oscuro
  },
  specialty: {
    marginTop: 8,
    fontSize: 18,
    color: "#6A3AB6", // Morado medio
  },
  location: {
    marginTop: 4,
    fontSize: 16,
    color: "#7D8A8C", // Gris suave
  },
  description: {
    marginTop: 16,
    fontSize: 14,
    color: "#585858", // Gris oscuro
  },
  button: {
    marginTop: 24,
    backgroundColor: "#7B2CBF", // Morado intenso
    borderColor: "#7B2CBF",
    borderRadius: 8,
  },
});
