import { View, Text, StyleSheet } from 'react-native';

export const TestPagoScreen = () => {


  return (
    <View style={styles.container}>
      <Text style={styles.hola}>Hola</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  hola: {
    fontSize: 24,
    marginBottom: 20,
  },
  pagoStatus: {
    marginTop: 20,
    fontSize: 18,
    //color: pagoRealizado ? 'green' : 'red',
  },
});


