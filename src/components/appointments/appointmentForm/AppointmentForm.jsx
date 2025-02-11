import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Input, Button } from "@ui-kitten/components";

export const AppointmentForm = ({ formik, date, time, professional }) => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.title} category="h4">Turno para: {professional?.professionalName}</Text>
      <Text style={styles.subtitle}>
        Fecha: <Text style={styles.boldText}>{date}</Text>
      </Text>
      <Text style={styles.subtitle}>
        Hora: <Text style={styles.boldText}>{time}</Text>
      </Text>

      <Input
        style={styles.input}
        placeholder="Nombre Completo"
        value={formik.values.fullName}
        onChangeText={formik.handleChange("fullName")}
        onBlur={formik.handleBlur("fullName")}
        status={formik.errors.fullName && formik.touched.fullName ? "danger" : "basic"}
        caption={formik.errors.fullName && formik.touched.fullName ? formik.errors.fullName : ""}
      />
      
      <Input
        style={styles.input}
        placeholder="DNI"
        keyboardType="numeric"
        value={formik.values.dni}
        onChangeText={formik.handleChange("dni")}
        onBlur={formik.handleBlur("dni")}
        status={formik.errors.dni && formik.touched.dni ? "danger" : "basic"}
        caption={formik.errors.dni && formik.touched.dni ? formik.errors.dni : ""}
      />

      <Input
        style={styles.input}
        placeholder="Teléfono"
        keyboardType="phone-pad"
        value={formik.values.phone}
        onChangeText={formik.handleChange("phone")}
        onBlur={formik.handleBlur("phone")}
        status={formik.errors.phone && formik.touched.phone ? "danger" : "basic"}
        caption={formik.errors.phone && formik.touched.phone ? formik.errors.phone : ""}
      />

      <Button style={styles.button} onPress={formik.handleSubmit}>
        Reservar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
  },
  input: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#7B2CBF",
    borderColor: "#7B2CBF",
    borderRadius: 8,
    marginTop: 10,
  },
});
