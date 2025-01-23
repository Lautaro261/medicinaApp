import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "@ui-kitten/components";

export const MyAppointmentsScreen = ({ route }) => {
  // Obtenemos los datos de los params
  const { date, time, professional } = route.params;

  return (
    <View style={styles.container}>
      {/* Card con los detalles del turno */}
      <Card style={styles.card}>
        <Text category="h5" style={styles.cardTitle}>
          Detalles del turno
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Profesional:</Text> {professional?.name}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Fecha:</Text> {date}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Hora:</Text> {time}
        </Text>
        <Text style={styles.cardText}>
          <Text style={styles.label}>Costo:</Text> $500
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    padding: 16,
  },
  card: {
    width: "90%",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  cardTitle: {
    textAlign: "center",
    marginBottom: 16,
    color: "#5A189A",
    fontWeight: "bold",
  },
  cardText: {
    marginBottom: 8,
    fontSize: 16,
    color: "#333333",
  },
  label: {
    fontWeight: "bold",
    color: "#5A189A",
  },
});
