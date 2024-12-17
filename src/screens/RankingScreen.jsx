import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const RankingScreen = () => {
  return (
    <View style={styles.container}>
      <Text>RankingScreen</Text>
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