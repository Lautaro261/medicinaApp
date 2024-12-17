import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Layout, Input } from '@ui-kitten/components';

export const InfoForm = (props) => {
    const { formik } = props; 


  return (
        <Layout style={styles.container}>
            <Input
            placeholder="Nombre"
            onChangeText={(text) => formik.setFieldValue("name", text)}
            errorMessage={formik.errors.name}
            style={styles.input}
            />

            <Input
             placeholder="Dirección"
             onChangeText={(text) => formik.setFieldValue("address", text)}
          errorMessage={formik.errors.address}
          style={styles.input}
            />

            <Input
            placeholder="Telefono"
            onChangeText={(text) => formik.setFieldValue("phone", text)}
            errorMessage={formik.errors.phone}
            style={styles.input}
            keyboardType="phone-pad"
            />

            <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => formik.setFieldValue("email", text)}
            errorMessage={formik.errors.email}
            style={styles.input}
            />

            <Input
            placeholder="Descripcion del restaurante"
            multiline={true}
            textStyle={{ minHeight: 80 }}
            onChangeText={(text) => formik.setFieldValue("description", text)}
            errorMessage={formik.errors.description}
            style={styles.input}
            />

        </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F3EAFB', // Fondo coherente con el tema
    borderRadius: 8,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: '#D0B3F1',
    borderWidth: 1,
    paddingHorizontal: 12,
  },
});