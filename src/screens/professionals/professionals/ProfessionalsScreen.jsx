import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { ListProfessionals } from "../../../components/listProfessionals/ListProfessionals"; // Asegúrate de importar el componente ListProfessionals
import { professionalsData } from "../../../../data/professionals-datos";
import { Button, Icon } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { screen } from '../../../utils/ScreenName'


export const ProfessionalsScreen = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(screen.professional.addProfessional)
    // Aquí puedes navegar a otro screen con navigation.navigate('AddProfessional')
  };

  return (
    <View style={styles.container}>
      <ListProfessionals professionals={professionalsData} />

      <Button
        style={styles.floatingButton}
        accessoryLeft={(props) => <Icon {...props} name="plus-outline" />}
        onPress={handlePress}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // Fondo gris claro
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7B2CBF', // Morado intenso para el botón
  },
});
