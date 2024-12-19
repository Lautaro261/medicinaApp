import React from "react";
import { StyleSheet } from "react-native";
import { Overlay } from "@rneui/themed";

export const Modal=(props) =>{
  const { show, close, children } = props;

  return (
    <Overlay
      isVisible={show}
      overlayStyle={styles.overlay}
      onBackdropPress={close}
    >
      {children}
    </Overlay>
  );
}

const styles = StyleSheet.create({
    overlay: {
      height: "auto",
      width: "90%",
      backgroundColor: "#fff",
    },
  });
  
