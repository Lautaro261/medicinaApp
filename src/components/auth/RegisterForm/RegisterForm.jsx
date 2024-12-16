import React from 'react';
import { StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { Layout, Input, Button } from '@ui-kitten/components';

export const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      console.log('Datos enviados:', values);
    },
  });

  return (
    <Layout style={styles.container}>
      {/* Input Nombre */}
      <Input
        placeholder="Nombre"
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
        onBlur={formik.handleBlur('name')}
        style={styles.input}
      />

      {/* Input Correo */}
      <Input
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Correo electrónico"
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
        style={styles.input}
      />

      {/* Input Contraseña */}
      <Input
        autoCapitalize="none"
        placeholder="Contraseña"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        style={styles.input}
      />

      {/* Input Repetir Contraseña */}
      <Input
        autoCapitalize="none"
        placeholder="Repetir Contraseña"
        secureTextEntry
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
        onBlur={formik.handleBlur('confirmPassword')}
        style={styles.input}
      />

      {/* Botón Registrar */}
      <Button onPress={formik.handleSubmit} style={styles.button}>
        Registrar
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F3EAFB', // Fondo morado claro
  },
  input: {
    marginBottom: 16,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: '#D0B3F1', // Morado claro en bordes
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: '#7B2CBF', // Morado intenso
    borderColor: '#7B2CBF',
    borderRadius: 8,

  },
});
