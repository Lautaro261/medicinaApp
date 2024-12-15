import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';

export const RegisterScreen = () => {
  const navigation = useNavigation();
  return (
    <Formik
      initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
      onSubmit={(values) => {
        console.log('Register values:', values);
        navigation.navigate('Login');
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <Layout style={styles.container}> 
          <Text category="h1" style={styles.title}>
            Crear cuenta
          </Text>
          <Text category="s1" style={styles.subtitle}>
            Regístrate para empezar
          </Text>
          <Input
            placeholder="Nombre completo"
            onChangeText={handleChange('name')}
            value={values.name}
            onBlur={handleBlur('name')}
            style={styles.input}
          />
          <Input
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Correo electrónico"
            onChangeText={handleChange('email')}
            value={values.email}
            onBlur={handleBlur('email')}
            style={styles.input}
          />
          <Input
            autoCapitalize="none"
            placeholder="Contraseña"
            secureTextEntry
            onChangeText={handleChange('password')}
            value={values.password}
            onBlur={handleBlur('password')}
            style={styles.input}
          />
          <Input
            autoCapitalize="none"
            placeholder="Confirmar contraseña"
            secureTextEntry
            onChangeText={handleChange('confirmPassword')}
            value={values.confirmPassword}
            onBlur={handleBlur('confirmPassword')}
            style={styles.input}
          />
          <Button onPress={handleSubmit} style={styles.button}>
            Registrarse
          </Button>
          <Text style={styles.footer}>
            ¿Ya tienes una cuenta? <Text style={styles.link}>Inicia sesión</Text>
          </Text>
        </Layout>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F3EAFB', // Fondo morado claro
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5A189A', // Morado oscuro
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6A3AB6', // Morado medio
    marginBottom: 24,
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
    marginVertical: 16,
    borderRadius: 8,
  },
  footer: {
    marginTop: 16,
    color: '#6A3AB6', // Morado medio
  },
  link: {
    color: '#5A189A', // Morado oscuro
    fontWeight: 'bold',
  },
});
