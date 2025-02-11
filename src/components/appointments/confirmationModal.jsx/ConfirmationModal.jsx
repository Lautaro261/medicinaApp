import React from "react";
import { StyleSheet, View } from "react-native";
import { Modal, Card, Text, Button } from "@ui-kitten/components";

export const ConfirmationModal = ({ visible, onCancel, onConfirm, date, time, professional, loading }) => {
  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={onCancel}
    >
      <Card disabled={true} style={styles.card}>
        <Text style={styles.modalText}>Está por reservar un turno:</Text>
        <Text style={styles.modalText}>{professional?.name}</Text>
        <Text style={styles.modalText}>Día: {date}</Text>
        <Text style={styles.modalText}>Hora: {time}</Text>
        <Text style={styles.modalText}>El costo de la reserva es $500.</Text>

        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonSecondary}
            appearance="filled"
            activeOpacity={0.7}
            onPress={onCancel}
          >
            Cancelar
          </Button>
          <View style={styles.buttonSpacer} />
          <Button
            style={styles.buttonPrimary}
            onPress={onConfirm}
            disabled={loading}
            appearance="filled"
            activeOpacity={0.7}
          >
            {loading ? "Procesando..." : "Confirmar y Seguir"}
          </Button>
        </View>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalText: {
    textAlign: "center",
    marginBottom: 8,
    color: "#5A189A",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    alignItems: "center",
  },
  buttonSpacer: {
    width: 10, // Espacio entre los botones
  },
  buttonPrimary: {
    backgroundColor: '#5A189A', 
    borderColor: "#5A189A",
    color: '#FFFFFF', 
    padding: 10,
    borderRadius: 8,
    width: '60%',
  },
  buttonSecondary: {
    backgroundColor: '#5d5c5c', 
    borderColor: "#5d5c5c",
    color: '#FFFFFF', 
    padding: 10,
    borderRadius: 8,
    width: '40%',
  },
  backdrop: {
    backgroundColor: "#200838eb",
  },
  card: {
    width: '90%',
    padding: 20,
  },
});
