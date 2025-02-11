import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { AirbnbRating } from "react-native-ratings";

export const Header = (props) => {
  const { professional } = props;

  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{professional.name}</Text>
        {/* Reemplazo de Rating de @rneui/themed por AirbnbRating */}
        <AirbnbRating
          count={5} 
          defaultRating={professional.ratingMedia || 0} 
          size={25} 
          isDisabled={true} 
        />
      </View>
      <Text style={styles.description}>{professional.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    margin: 10,
    //backgroundColor: "red",
    paddingTop: -10,
  },
  titleView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    marginTop: 5,
    color: "#717171",
  },
});
