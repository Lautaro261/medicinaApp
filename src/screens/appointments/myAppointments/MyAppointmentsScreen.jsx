import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "@ui-kitten/components";
import { AppointmentsList } from "../../../components/appointments/appointmentsList/AppointmentsList";

export const MyAppointmentsScreen = ({ route }) => {
  const { appointments = [] } = route?.params || {};

  console.log("MyAppointmentsScreen:", appointments)

  return (
    <View style={styles.container}>
      {appointments.length === 0 ? (
        <Text category="h5" style={styles.emptyText}>No tienes turnos aún.</Text>
      ) : (
        <AppointmentsList appointments={appointments} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    padding: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#5A189A",
    marginTop: 20,
  },
});
