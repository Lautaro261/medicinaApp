import React from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Text, Avatar, Icon } from "@ui-kitten/components"; // Importar Icon
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/ScreenName";

export const ProfessionalsList = (props) => {
  const { professionals } = props;
  const navigation = useNavigation();

  const goToProfessional = (professional) => {
    navigation.navigate(screen.professional.professional, {id: professional.id})
  };

  return (
    <FlatList
      data={professionals}
      renderItem={(doc) => {
        const professional = doc.item.data();

        return (
          <TouchableOpacity onPress={() => goToProfessional(professional)}>
            <View style={styles.professional}>
              <Avatar
                source={{ uri: professional.images[0] || 'https://via.placeholder.com/150' }}
                style={styles.avatar}
              />

              <View style={styles.infoContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>{professional.name || "Dr. Juan Pérez"}</Text>
                  {professional.verified && (
                    <Icon 
                      name="checkmark-circle-2" 
                      fill="#3D9CFF" 
                      style={styles.verifiedIcon} // Estilo para el icono
                    />
                  )}
                </View>
                <Text style={styles.specialty}>{professional.phone || ""}</Text>
                <Text style={styles.location}>{ professional.address || "CABA, Argentina"}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

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
  nameContainer: {
    flexDirection: "row", // Asegura que el nombre y el icono estén en la misma fila
    alignItems: "center", // Centra el icono verticalmente
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
    color: "#878686", // Gris claro para la ubicación
  },
  verifiedIcon: {
    marginLeft: 8, // Espaciado entre el nombre y el ícono
    width: 20,
    height: 20,
  },
});

