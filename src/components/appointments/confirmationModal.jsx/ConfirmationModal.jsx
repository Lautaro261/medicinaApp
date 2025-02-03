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
      <Card disabled={true}>
        <Text style={styles.modalText}>Está por reservar un turno:</Text>
        <Text style={styles.modalText}>{professional?.name}</Text>
        <Text style={styles.modalText}>Día: {date}</Text>
        <Text style={styles.modalText}>Hora: {time}</Text>
        <Text style={styles.modalText}>El costo de la reserva es $500.</Text>

        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            appearance="outline"
            onPress={onCancel}
          >
            Cancelar
          </Button>
          <Button
            style={styles.button}
            onPress={onConfirm}
            disabled={loading}
          >
            {loading ? "Procesando..." : "Confirmar y seguir"}
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
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
