import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Card, Text } from "@ui-kitten/components";

export const AppointmentsList = ({ appointments }) => {
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Text category="h6" style={styles.cardTitle}>Detalles del Turno</Text>
      <Text style={styles.cardText}>
        <Text style={styles.label}>Profesional:</Text> {item.professional?.name}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.label}>Fecha:</Text> {item.date}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.label}>Hora:</Text> {item.time}
      </Text>
      <Text style={styles.cardText}>
        <Text style={styles.label}>Costo:</Text> $500
      </Text>
    </Card>
  );

  return (
    <FlatList
      data={appointments}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  cardTitle: {
    textAlign: "center",
    marginBottom: 12,
    color: "#5A189A",
    fontWeight: "bold",
  },
  cardText: {
    marginBottom: 6,
    fontSize: 16,
    color: "#333333",
  },
  label: {
    fontWeight: "bold",
    color: "#5A189A",
  },
});
