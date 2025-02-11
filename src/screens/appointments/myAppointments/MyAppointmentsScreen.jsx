import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, RefreshControl } from "react-native";
import { Text } from "@ui-kitten/components";
import { AppointmentsList } from "../../../components/appointments/appointmentsList/AppointmentsList";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export const MyAppointmentsScreen = ({ route }) => {
  // Se extrae el userId; si no está definido, se asigna undefined
  const { userId } = route.params || {};
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Función para obtener los turnos de Firestore
  const fetchAppointments = async () => {
    try {
      const db = getFirestore();
      const appointmentsRef = collection(db, "Appointments");
      // Consulta los turnos donde clientId es igual al userId recibido
      const q = query(appointmentsRef, where("clientId", "==", userId));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Turnos reservados:", data);
      setAppointments(data);
    } catch (error) {
      console.error("Error al obtener turnos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Se llama a fetchAppointments al montar el componente
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    fetchAppointments();
  }, [userId]);

  // Función para refrescar los turnos manualmente
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAppointments();
    setRefreshing(false);
  };

  // Mientras se carga la información, muestra un mensaje de carga
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Cargando turnos...</Text>
      </View>
    );
  }

  // Si no hay userId (por ejemplo, el usuario no está autenticado)
  if (!userId) {
    return (
      <View style={styles.container}>
        <Text category="h5" style={styles.emptyText}>No tienes turnos aún.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {appointments.length === 0 ? (
        <Text category="h5" style={styles.emptyText}>No tienes turnos aún.</Text>
      ) : (
        <AppointmentsList appointments={appointments} />
      )}
    </ScrollView>
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
