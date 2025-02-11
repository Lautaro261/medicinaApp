import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card, Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/ScreenName";

export const TimeCard = ({ date, time, professional }) => {
  const navigation = useNavigation();

  const handleSelectTime = () => {
    console.log(`Seleccionaste la hora: ${date} - ${time.time}, appointmentId: ${time.id}`);
    console.log("TURNO", {
      date,
      time: time.time,
      professional,
      appointmentId: time.id,
    })
    // Navega al formulario de turno pasando además el appointmentId
     navigation.navigate(screen.appointment.appointmentForm, {
      date,
      time: time.time,
      professional,
      appointmentId: time.id,
    });
  };

  return (
    <Card style={styles.timeCard}>
      <Text style={styles.timeText}>{time.time}</Text>
      <Button size="tiny" appearance="ghost" onPress={handleSelectTime}>
        Seleccionar
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  timeCard: {
    marginRight: 12,
    padding: 8,
    backgroundColor: "#EDEAFD",
    borderRadius: 8,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#5A189A",
    marginBottom: 4,
  },
});
