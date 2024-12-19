import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Rating } from "@rneui/themed";


export const Header=(props)=> {
  const { professional } = props;
  console.log(professional)

  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{professional.name}</Text>
        <Rating
          imageSize={20}
          readonly
          startingValue={professional.ratingMedia | 0}
        />
      </View>
      <Text style={styles.description}>{professional.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    content: {
      margin: 15,
    },
    titleView: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    name: {
      fontSize: 20,
      fontWeight: "bold",
    },
    description: {
      marginTop: 5,
      color: "#828282",
    },
  });
  
