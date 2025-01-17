import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const MyAppointmentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MyAppointmentsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});