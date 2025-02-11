import React from 'react';
import { StyleSheet, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { RegisterForm } from '../../../components/auth/RegisterForm/RegisterForm';
import { screen } from '../../../utils/ScreenName';

export const RegisterScreen = () => {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate(screen.account.login);
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Layout style={styles.container}>
          {/* Título */}
          {/* <Image 
            source={require('../../../../assets/img/AppCogniKids.png')} 
            style={styles.image} 
          /> */}

          {/* Subtítulo */}
          <Text category="s1" style={styles.subtitle}>
            CREAR cuenta para continuar
          </Text>

          {/* Formulario de Registro */}
          <RegisterForm />

          {/* Enlace para crear cuenta */}
          <Text style={styles.footer}>
            ¿Ya tienes una cuenta? <Text style={styles.link} onPress={goToLogin}>Login</Text>
          </Text>
        </Layout>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3EAFB',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F3EAFB',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A3AB6',
    marginBottom: 5,
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