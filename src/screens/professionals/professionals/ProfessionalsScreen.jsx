import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ListProfessionals } from "../../../components/listProfessionals/ListProfessionals"; // Asegúrate de importar el componente ListProfessionals
import { professionalsData } from "../../../../data/professionals-datos";


export const ProfessionalsScreen = () => {
  // Aquí simulo una lista de 5 profesionales como ejemplo


  return (
    <View style={styles.container}>
      <ListProfessionals professionals={professionalsData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Fondo gris claro
  },
});
