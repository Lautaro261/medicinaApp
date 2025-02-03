import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { getAppointments } from "../../../../data/professionals-datos";
import { Text } from "@ui-kitten/components";
import { LoadingModal } from "../../../components/shared/loadingModal/LoadingModal";
import { AvailableAppointmentsList } from "../../../components/appointments/availableAppointmentsList/AvailableAppointmentsList";

export const AvailableAppointmentsScreen = ({ route }) => {
  const { id, name } = route.params;
  const [appointments, setAppointments] = useState(null); // Inicialmente null para mostrar el loader

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Error al obtener turnos:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <View style={styles.container}>
      <Text category="h5" style={styles.title}>{name}</Text>

      {!appointments ? (
        <LoadingModal show text="Cargando turnos..." />
      ) : (
        <AvailableAppointmentsList
          appointments={appointments}
          professional={route.params}
        />
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
  title: {
    marginBottom: 10,
    fontWeight: "bold",
  },
});
