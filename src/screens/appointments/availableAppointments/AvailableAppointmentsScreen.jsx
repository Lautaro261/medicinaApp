import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { Card, Button } from "@ui-kitten/components";
import { getAppointments } from "../../../../data/professionals-datos"; // Servicio para traer los datos
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/ScreenName";

export const AvailableAppointmentsScreen = (props) => {
  const { route } = props;
  const [appointments, setAppointments] = useState([]);
  console.log(route.params)

  useEffect(() => {
    // Simulamos una carga de datos (puedes usar Firestore aquí)
    const fetchAppointments = async () => {
      const data = await getAppointments();
      setAppointments(data);
    };
    fetchAppointments();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <DayCard date={item.date} times={item.times} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

// Subcomponente para cada día
const DayCard = ({ date, times }) => {
  return (
    <Card style={styles.dayCard}>
      <Text style={styles.dayText}>{date}</Text>
      <FlatList
        data={times}
        keyExtractor={(time) => time}
        horizontal
        renderItem={({ item }) => (
          <TimeCard time={item} date={date}/>
        )}
        contentContainerStyle={styles.timesContainer}
      />
    </Card>
  );
};

// Subcomponente para cada hora
const TimeCard = ({ date, time }) => {
  const navigation = useNavigation(); // Hook para navegar
  const handleSelectTime = () => {
    console.log(`Seleccionaste la hora:${date} - ${time}`);
    navigation.navigate(screen.appointment.appointmentForm, { date, time });
  };

  return (
    <Card style={styles.timeCard}>
      <Text style={styles.timeText}>{time}</Text>
      <Button size="tiny" appearance="ghost" onPress={handleSelectTime}>
        Seleccionar
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  dayCard: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#F8F0FC",
    padding: 16,
    elevation: 2,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5A189A",
    marginBottom: 12,
  },
  timesContainer: {
    flexDirection: "row",
  },
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
