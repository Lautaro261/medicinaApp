import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { DayCard } from "../dayCard/DayCard";

export const AvailableAppointmentsList = ({ appointments, professional }) => {
  if (appointments.length === 0) {
    return <Text style={styles.emptyText}>No hay turnos disponibles.</Text>;
  }

  return (
    <FlatList
      data={appointments}
      keyExtractor={(item) => item.date}
      renderItem={({ item }) => (
        <DayCard date={item.date} times={item.times} professional={professional} />
      )}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 20,
    fontSize: 16,
  },
});
