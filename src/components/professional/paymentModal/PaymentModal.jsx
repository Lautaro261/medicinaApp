import React from "react";
import { StyleSheet } from "react-native";
import { Modal, Layout, Button, Text } from "@ui-kitten/components";

export const PaymentModal = ({ visible, onClose, onConfirm }) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      backdropStyle={styles.backdrop}
    >
      <Layout style={styles.modalContainer}>
        <Text style={styles.modalText}>
          La verificación tiene un coste de $100.
        </Text>
        <Layout style={styles.modalButtonsContainer}>
          <Button
            style={styles.buttonCancel}
            onPress={onClose}
            activeOpacity={0.7}
            appearance="filled"
          >
            Cancelar
          </Button>
          <Button
            style={styles.buttonPrimary}
            onPress={onConfirm}
            activeOpacity={0.7}
            appearance="filled"
          >
            Continuar con el pago
          </Button>
        </Layout>
      </Layout>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 60,
    borderRadius: 10,
    alignItems: "center",
    minHeight: 180,
    width: 400,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
    marginBottom: 40,
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    //marginTop: 20,
    marginBottom: -40,
  },
  buttonPrimary: {
    backgroundColor: "#5A189A",
    borderColor: "#5A189A",
    color: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    width: "50%",
  },
  buttonCancel: {
    backgroundColor: "#ba1c1c",
    borderColor: "#ba1c1c",
    color: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    width: "35%",
  },
  backdrop: {
    backgroundColor: "#200838eb",
  },
});
