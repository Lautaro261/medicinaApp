import React from "react";
import { StyleSheet, View } from "react-native";
import { Modal, Card, Text, Button } from "@ui-kitten/components";

export const ConfirmationModal = ({ visible, onCancel, onConfirm, date, time, professional, loading }) => {
  console.log("PROFESSIONAL", professional);
  return (
    <Modal
      visible={visible}
      backdropStyle={styles.backdrop}
      onBackdropPress={onCancel}
    >
      <View style={styles.centeredView}>
        <Card disabled={true} style={styles.card}>
          <Text style={styles.modalText}>Está por reservar un turno:</Text>
          <Text style={styles.modalText}>
            <Text style={styles.boldText}>{professional?.professionalName}</Text>
          </Text>
          <Text style={styles.modalText}>
            Día: <Text style={styles.boldText}>{date}</Text>
          </Text>
          <Text style={styles.modalText}>
            Hora: <Text style={styles.boldText}>{time}</Text>
          </Text>
          <Text style={styles.modalText}>
            El costo de la reserva es de: <Text style={styles.boldText}>$500</Text>
          </Text>

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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    textAlign: "center",
    marginBottom: 8,
    color: "#5A189A",
  },
  boldText: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center", // Cambiado a "center" para centrar los botones
    marginTop: 16,
    alignItems: "center",
    //backgroundColor: "green"
  },
  buttonSpacer: {
    width: 10, // Espacio entre los botones
  },
  buttonPrimary: {
    backgroundColor: '#5A189A', 
    borderColor: "#5A189A",
    color: '#FFFFFF', 
    padding: 5,
    borderRadius: 8,
    //width: '%',
  },
  buttonSecondary: {
    backgroundColor: '#5d5c5c', 
    borderColor: "#5d5c5c",
    color: '#FFFFFF', 
    padding: 10,
    borderRadius: 8,
    //width: '40%',
  },
  backdrop: {
    backgroundColor: "#200838eb",
  },
  card: {
    width: '90%',
    padding: 20,
  },
});
