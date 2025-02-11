/* import React, { useState, useEffect } from "react";
import { StyleSheet, Linking } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/ScreenName";
import { handleIntegrationMPAppointment } from "../../../utils/mercadoPago";
import { AppointmentForm } from "../../../components/appointments/appointmentForm/AppointmentForm";
import { ConfirmationModal } from "../../../components/appointments/confirmationModal.jsx/ConfirmationModal";
import { validationSchema } from "./appointmentForm.data";
import { useFormik } from "formik";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const AppointmentFormScreen = ({ route }) => {
  const { date, time, professional, appointmentId } = route.params;
  console.log("FORM SCREEN professional", professional);
  const navigation = useNavigation();
  const db = getFirestore();
  const auth = getAuth();
  

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        console.log("Consultando datos para el usuario con ID:", auth.currentUser.uid);

        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const user = userSnap.data();
          console.log("Información del usuario obtenida:", user.dni);
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

  const formik = useFormik({
    initialValues: userData || { fullName: "", dni: "", phone: "" },
    enableReinitialize: true, // Permite actualizar los valores cuando se obtienen de Firestore
    validationSchema,
    onSubmit: () => setModalVisible(true),
  });

  const handleConfirm = async () => {
    try {
      const appointmentsRef = doc(db, "Appointments", "03a25fc4-b399-4889-a2fa-2fc55e7c6894");
      
      // Datos del turno
      const appointmentData = {
        clientDni: formik.values.dni,
        clientId: auth.currentUser.uid,
        clientName: formik.values.fullName,
        clientPhone: formik.values.phone,
        id: "03a25fc4-b399-4889-a2fa-2fc55e7c6894",
        professionalId: professional.id,
        status: "booked",
      };
  
      console.log("Guardando turno en Firestore...");
      await setDoc(appointmentsRef, appointmentData, { merge: true });
      console.log("Turno guardado correctamente.");
  
      // Después de guardar el turno, procesar el pago
      console.log("Iniciando integración con Mercado Pago...");
      /* const paymentUrl = await handleIntegrationMPAppointment();
  
      if (paymentUrl) {
        console.log("Redirigiendo a 'Mis turnos'...");
        navigation.navigate(screen.appointment.myAppointments, {
          appointments: [{ date, time, professional }],
        });
      } else {
        alert("Error al procesar el pago. Inténtelo nuevamente.");
      } 
    } catch (error) {
      console.error("Error al confirmar el turno:", error);
      alert("Hubo un problema con la reserva del turno. Intente más tarde.");
    } finally {
      setModalVisible(false);
    }
  };
  

  if (loading) {
    return <Layout style={styles.container}><Text>Cargando...</Text></Layout>;
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
    backgroundColor: "#F3EAFB",
  },
}); */


import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/ScreenName";
import { AppointmentForm } from "../../../components/appointments/appointmentForm/AppointmentForm";
import { ConfirmationModal } from "../../../components/appointments/confirmationModal.jsx/ConfirmationModal";
import { validationSchema } from "./appointmentForm.data";
import { useFormik } from "formik";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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

  // Configuración de formik: usa enableReinitialize para actualizar los valores cuando se obtengan de Firestore
  const formik = useFormik({
    initialValues: userData || { fullName: "", dni: "", phone: "" },
    enableReinitialize: true,
    validationSchema,
    onSubmit: () => setModalVisible(true),
  });

 // Función que actualiza el documento de turno (Appointments) con los datos del usuario,
  // buscando el documento por la propiedad interna "id" que coincide con appointmentId
  const handleConfirm = async () => {
    try {
      const appointmentData = {
        clientDni: formik.values.dni,
        clientId: auth.currentUser.uid,
        clientName: formik.values.fullName,
        clientPhone: formik.values.phone,
        status: "booked", // Actualizamos el estado del turno
      };

      console.log("Actualizando turno con appointmentId:", appointmentId);
      await updateAppointmentByCustomId(appointmentId, appointmentData, db);
      console.log("Turno actualizado correctamente.");
      // Puedes navegar a la pantalla de "Mis Turnos" o mostrar otro feedback
      // navigation.navigate(screen.appointment.myAppointments, { ... });
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
