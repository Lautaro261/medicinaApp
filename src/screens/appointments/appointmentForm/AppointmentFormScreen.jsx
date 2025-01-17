import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Layout, Text, Input, Button, Modal, Card } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/ScreenName";

export const AppointmentFormScreen = ({ route }) => {
  const { date, time } = route.params;
   const navigation = useNavigation();
  // Estados para los inputs y el modal
  const [formData, setFormData] = useState({
    fullName: "",
    dni: "",
    phone: "",
  });
  const [visible, setVisible] = useState(false);

  // Manejar el cambio de valores en los inputs
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Acción al presionar el botón "Reservar"
  const handleReserve = () => {
    setVisible(true);
    console.log("Datos del formulario:", formData);
  };

  // Cerrar el modal y navegar a la pantalla correspondiente
  const navigateToHome = () => {
    setVisible(false);
    navigation.navigate(screen.professional.professionals);
  };

  const navigateToAppointments = () => {
    setVisible(false);
    navigation.navigate(screen.appointment.myAppointments);
  };

  return (
    <Layout style={styles.container}>
      {/* Título */}
      <Text style={styles.title} category="h4">
        Turno: {date}
      </Text>
      <Text style={styles.subtitle} category="s1">
        Hora: {time}
      </Text>

      {/* Formulario */}
      <View style={styles.form}>
        <Input
          style={styles.input}
          placeholder="Nombre Completo"
          value={formData.fullName}
          onChangeText={(value) => handleInputChange("fullName", value)}
        />
        <Input
          style={styles.input}
          placeholder="DNI"
          keyboardType="numeric"
          value={formData.dni}
          onChangeText={(value) => handleInputChange("dni", value)}
        />
        <Input
          style={styles.input}
          placeholder="Teléfono"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(value) => handleInputChange("phone", value)}
        />

        {/* Botón Reservar */}
        <Button style={styles.button} onPress={handleReserve}>
          Reservar
        </Button>
      </View>


      {/* Modal de confirmación */}
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <Text style={styles.modalText}>
            ¡Tu turno fue registrado con éxito!
          </Text>
          <View style={styles.modalButtonsContainer}>
            <Button
              style={styles.modalButton}
              appearance="outline"
              onPress={navigateToHome}
            >
              Ir al inicio
            </Button>
            <Button style={styles.modalButton} onPress={navigateToAppointments}>
              Ver mis turnos
            </Button>
          </View>
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F3F3F3",
  },
  title: {
    textAlign: "center",
    color: "#5A189A",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#5A189A",
    marginBottom: 16,
  },
  form: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#5A189A",
    borderColor: "#5A189A",
  },
  modalText: {
    textAlign: "center",
    marginBottom: 16,
    color: "#5A189A",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
