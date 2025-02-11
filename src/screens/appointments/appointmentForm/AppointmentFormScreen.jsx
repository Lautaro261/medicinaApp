import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/ScreenName";
import { AppointmentForm } from "../../../components/appointments/appointmentForm/AppointmentForm";
import { ConfirmationModal } from "../../../components/appointments/confirmationModal.jsx/ConfirmationModal";
import { validationSchema } from "./appointmentForm.data";
import { useFormik } from "formik";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { updateAppointmentByCustomId } from "../../../utils/createProfessional";

export const AppointmentFormScreen = ({ route }) => {
  const { date, time, professional, appointmentId } = route.params;
  console.log("Datos recibidos en AppointmentFormScreen:", { date, time, professional, appointmentId });
  
  const navigation = useNavigation();
  const db = getFirestore();
  const auth = getAuth();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // Obtener datos del usuario actual para completar el formulario
  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        console.log("Consultando datos para el usuario:", auth.currentUser.uid);
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const user = userSnap.data();
          console.log("Datos del usuario obtenidos:", user);
          setUserData({
            fullName: `${user.first_name} ${user.last_name}`,
            dni: user?.dni ? user.dni.toString() : "",
            phone: user?.phone || "",
          });
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [auth.currentUser]);

  // Configuración de formik: enableReinitialize permite actualizar los valores cuando se obtengan de Firestore
  const formik = useFormik({
    initialValues: userData || { fullName: "", dni: "", phone: "" },
    enableReinitialize: true,
    validationSchema,
    onSubmit: () => setModalVisible(true),
  });

  // Función que actualiza el documento del turno en la colección "Appointments" usando el id interno
  const handleConfirm = async () => {
    try {
      const appointmentData = {
        clientDni: formik.values.dni,
        clientId: auth.currentUser.uid,
        clientName: formik.values.fullName,
        clientPhone: formik.values.phone,
        professionalName: professional?.professionalName, // Agregar nombre del profesional
        status: "booked", // Actualizamos el estado del turno
      };

      console.log("Actualizando turno con appointmentId:", appointmentId);
      // Actualizamos el documento de turno sin borrar el resto de las propiedades
      await updateAppointmentByCustomId(appointmentId, appointmentData, db);
      console.log("Turno actualizado correctamente.");

      // Limpiar el formulario
      formik.resetForm();

      // Navegar a "Mis Turnos" pasando el id del usuario
      navigation.navigate(screen.appointment.myAppointments, { userId: auth.currentUser.uid });
    } catch (error) {
      console.error("Error al confirmar el turno:", error);
      alert("Hubo un problema con la reserva del turno. Intente más tarde.");
    } finally {
      setModalVisible(false);
    }
  };

  if (loading) {
    return (
      <Layout style={styles.container}>
        <Text>Cargando...</Text>
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <AppointmentForm
        formik={formik}
        date={date}
        time={time}
        professional={professional}
      />
      <ConfirmationModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onConfirm={handleConfirm}
        date={date}
        time={time}
        professional={professional}
        loading={false}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F3F3F3",
  },
});
