import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Text } from "@rneui/themed";

export const Loading=(props)=> {
  const { show, text } = props;

  if (!show) return null;

  return (
    <View style={styles.content}>
      <ActivityIndicator size="large" color="#00a680" />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: "#00a680",
      textTransform: "uppercase",
      marginTop: 10,
    },
  });
  
