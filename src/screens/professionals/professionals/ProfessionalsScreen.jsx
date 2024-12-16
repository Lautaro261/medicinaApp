import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ListProfessionals } from "../../../components/listProfessionals/ListProfessionals"; // Asegúrate de importar el componente ListProfessionals
import { professionalsData } from "../../../../data/professionals-datos";


export const ProfessionalsScreen = () => {

  return (
    <View style={styles.container}>
      <ListProfessionals professionals={professionalsData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // Fondo gris claro
  },
});
