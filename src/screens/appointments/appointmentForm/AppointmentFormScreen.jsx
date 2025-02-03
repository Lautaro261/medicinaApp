import React, { useState } from "react";
import { StyleSheet, Linking } from "react-native";
import { Layout } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/ScreenName";
import { handleIntegrationMPAppointment } from "../../../utils/mercadoPago";
import { AppointmentForm } from "../../../components/appointments/appointmentForm/AppointmentForm";
import { ConfirmationModal } from "../../../components/appointments/confirmationModal.jsx/ConfirmationModal";

export const AppointmentFormScreen = ({ route }) => {
  const { date, time, professional } = route.params;
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    fullName: "",
    dni: "",
    phone: "",
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleReserve = () => setModalVisible(true);
  const handleCancel = () => setModalVisible(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const paymentUrl = await handleIntegrationMPAppointment();
      if (paymentUrl) {
        //await Linking.openURL(paymentUrl);
        navigation.navigate(screen.appointment.myAppointments, {
          appointments: [{ date, time, professional }]
        } );
      } else {
        alert("Error al procesar el pago. Inténtelo nuevamente.");
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Hubo un problema con el pago. Intente más tarde.");
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  return (
    <Layout style={styles.container}>
      <AppointmentForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleReserve={handleReserve}
        date={date}
        time={time}
        professional={professional}
      />
      <ConfirmationModal
        visible={modalVisible}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        date={date}
        time={time}
        professional={professional}
        loading={loading}
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
