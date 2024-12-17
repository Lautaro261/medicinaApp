import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { RegisterForm } from '../../../components/auth/RegisterForm/RegisterForm';
import { screen } from '../../../utils/ScreenName';



export const RegisterScreen = () => {
  const navigation = useNavigation();

  const goToLogin = ()=>{
    navigation.navigate(screen.account.login);
  }

  return (

      
    <Layout style={styles.container}>
    {/* Título */}
    <Text category="h1" style={styles.title}>
      Bienvenido
    </Text>

    {/* Subtítulo */}
    <Text category="s1" style={styles.subtitle}>
      Inicia sesión para continuar
    </Text>

    {/* Formulario de Login */}
    <RegisterForm />

    {/* Enlace para crear cuenta */}
    <Text style={styles.footer}>
      ¿Ya tienes una cuenta? <Text style={styles.link} onPress={goToLogin}>Login</Text>
    </Text>
  </Layout>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F3EAFB',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5A189A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6A3AB6',
    marginBottom: 24,
  },
  footer: {
    marginTop: 16,
    color: '#6A3AB6',
  },
  link: {
    color: '#5A189A',
    fontWeight: 'bold',
  },
});