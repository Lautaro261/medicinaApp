import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Input, Button } from "@ui-kitten/components";

export const AppointmentForm = ({ formData, handleInputChange, handleReserve, date, time, professional }) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title} category="h4">Turno para: {professional?.name}</Text>
      <Text style={styles.subtitle}>Fecha: {date}</Text>
      <Text style={styles.subtitle}>Hora: {time}</Text>

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

      <Button style={styles.button} onPress={handleReserve}>
        Reservar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: "center",
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
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#5A189A",
    borderColor: "#5A189A",
  },
});
