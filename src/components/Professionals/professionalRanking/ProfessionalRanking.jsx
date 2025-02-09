import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Image, Text, Icon } from "@rneui/themed";
import { AirbnbRating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/ScreenName";

export const ProfessionalRanking = (props) => {
  const { professional, index } = props;
  const navigation = useNavigation();

  const goToProfessional = () => {
    navigation.navigate(screen.professional.tab, {
      screen: screen.professional.professional,
      params: {
        id: professional.id,
      },
    });
  };

  const renderMedal = () => {
    if (index > 2) return null;

    let color = "";
    if (index === 0) color = "#FFD700";
    if (index === 1) color = "#BEBEBE";
    if (index === 2) color = "#CD7F32";

    return (
      <Icon
        type="material-community"
        name="medal-outline"
        color={color}
        containerStyle={styles.medal}
      />
    );
  };

  return (
    <TouchableOpacity onPress={goToProfessional}>
      <View style={styles.content}>
        <Image source={{ uri: professional.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <View style={styles.nameContent}>
            {renderMedal()}
            <Text style={styles.name}>{professional.name}</Text>
          </View>
          {/* AirbnbRating en lugar de @rneui/themed Rating */}
           <AirbnbRating
            count={5} 
            defaultRating={professional.ratingMedia}
            size={20} 
            isDisabled={true} 
          />
        </View>
        <Text style={styles.description}>{professional.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#f9f6f1",
    marginVertical: 10,
    marginHorizontal: 15,
  },
  image: {
    width: "100%",
    height: 150,
  },
  infoContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  medal: {
    marginRight: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    color: "#828282",
    fontSize: 12,
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 5,
  },
});
