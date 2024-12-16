import React from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Avatar } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../utils/ScreenName";

export const ListProfessionals = (props) => {
  const { professionals } = props;
  const navigation = useNavigation();

  const goToProfessional = (professional) => {
    console.log('Click', { professional });
    //navigation.navigate("ProfessionalDetail", { professional });
    navigation.navigate(screen.professional.professional, {professional})
  };

  return (
    <FlatList
      data={professionals}
      renderItem={(doc) => {
        const professional = doc.item;

        return (
          <TouchableOpacity onPress={() => goToProfessional(professional)}>
            <View style={styles.professional}>
              <Avatar
                source={{ uri: professional.image || 'https://via.placeholder.com/150' }}
                style={styles.avatar}
              />

              <View style={styles.infoContainer}>
                <Text style={styles.name}>{professional.name || "Dr. Juan Pérez"}</Text>
                <Text style={styles.specialty}>{professional.specialty || "Pediatra"}</Text>
                <Text style={styles.location}>{professional.location || "CABA, Argentina"}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  professional: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    alignItems: "center",
    backgroundColor: "#F3EAFB", // Fondo morado claro
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,  // Sombra para efecto de profundidad
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 16,
    borderRadius: 30,  // Para redondear el avatar
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5A189A", // Morado oscuro
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: "#6A3AB6", // Morado medio
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: "#AAA", // Gris claro para la ubicación
  },
});
