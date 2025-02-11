import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { Icon } from "@ui-kitten/components"; // Usamos Icon de UI Kitten si lo prefieres
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { LoadingModal } from "../../../components/shared/loadingModal/LoadingModal";
import { AvailableAppointmentsList } from "../../../components/appointments/availableAppointmentsList/AvailableAppointmentsList";
import { db } from "../../../utils/firebase"; 
import { transformAppointments } from "../../../utils/transformAppointments";
import { screen } from "../../../utils/ScreenName";

export const AvailableAppointmentsScreen = ({ route, navigation }) => {
  const { id: professionalId, name: professionalName } = route.params;
  const [appointments, setAppointments] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Verificar usuario autenticado y obtener su rol
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserRole(user.uid);
      } else {
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserRole = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserRole(userSnap.data().role);
      } else {
        setUserRole(null);
      }
    } catch (error) {
      console.error("Error al obtener el rol del usuario:", error);
      setUserRole(null);
    }
  };

  // Obtener turnos disponibles del profesional
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsRef = collection(db, "Appointments");
        const q = query(
          appointmentsRef, 
          where("professionalId", "==", professionalId), 
          where("status", "==", "available")
        );
        const querySnapshot = await getDocs(q);
        const rawData = querySnapshot.docs.map(doc => doc.data());
        const formattedAppointments = transformAppointments(rawData);
        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Error al obtener turnos:", error);
      }
    };
    fetchAppointments();
  }, [professionalId]);

  // Función para navegar a la pantalla para agregar más turnos
  const goToAddAppointment = () => {
    navigation.navigate(screen.appointment.addAppointment, { professionalId });
  };

  return (
    <View style={styles.container}>
      <Text category="h5" style={styles.title}>{professionalName}</Text>

      {!appointments ? (
        <LoadingModal show text="Cargando turnos..." />
      ) : (
        <AvailableAppointmentsList
          appointments={appointments}
          professional={{ professionalId, professionalName }}
        />
      )}

      {/* Mostrar el botón solo si el usuario autenticado es un "professional" */}
      {currentUser && userRole === "professional" && (
        <Icon
          name="plus"
          fill="#00a680"
          style={styles.btnContainer}
          onPress={goToAddAppointment}
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
  btnContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 40,
    height: 40,
  },
});



