import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { getAppointments } from "../../../../data/professionals-datos"; // Servicio para traer los datos
import { DayCard } from "../../../components/appointments/dayCard/DayCard";
import { Text } from "@ui-kitten/components";

export const AvailableAppointmentsScreen = (props) => {
  const { route } = props
  const { id, name} = route.params
  const [appointments, setAppointments] = useState([]);
  //console.log(id, name)

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
      <Text>{name}</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <DayCard date={item.date} times={item.times} professional={route.params}/>}
        contentContainerStyle={styles.listContent}
      />
    </View>
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
});
