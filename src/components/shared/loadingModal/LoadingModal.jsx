import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Modal, Layout, Text } from "@ui-kitten/components";

export function LoadingModal({ show, text }) {
  return (
    <Modal visible={show} backdropStyle={styles.backdrop}>
      <Layout style={styles.modalContainer}>
        <ActivityIndicator size="large" color="#5A189A" />
        {text && <Text style={styles.text}>{text}</Text>}
      </Layout>
    </Modal>
  );
}

LoadingModal.defaultProps = {
  show: false,
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
    width: 220,
  },
  text: {
    color: "#5A189A",
    textTransform: "uppercase",
    marginTop: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  backdrop: {
    backgroundColor: "#200838eb",
  },
});
