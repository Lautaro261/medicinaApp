import React from "react";
import { StyleSheet, Text, FlatList } from "react-native";
import { Card } from "@ui-kitten/components";
import { TimeCard } from "../timeCard/TimeCard";

export const DayCard = ({ date, times, professional }) => {
  return (
    <Card style={styles.dayCard}>
      <Text style={styles.dayText}>{date}</Text>
      <FlatList
        data={times}
        keyExtractor={(item) => item.id} // Usamos el id del turno
        horizontal
        renderItem={({ item }) => (
          <TimeCard time={item} date={date} professional={professional} />
        )}
        contentContainerStyle={styles.timesContainer}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
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
});
