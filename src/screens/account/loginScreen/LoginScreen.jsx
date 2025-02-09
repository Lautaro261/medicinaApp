import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Layout, Text} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { LoginForm } from '../../../components/auth/loginForm/LoginForm';
import { screen } from '../../../utils/ScreenName';



export const LoginScreen = () => {
  const navigation = useNavigation();

  const goToRegister = ()=>{
    navigation.navigate(screen.account.register);
  }


  return (

      
    <Layout style={styles.container}>
    {/* Título */}
    <Image 
      source={require('../../../../assets/img/AppCogniKids.png')} 
      style={styles.image} 
    />
    <Text category="h1" style={styles.title}>
      Bienvenido
    </Text>

    {/* Subtítulo */}
    <Text category="s1" style={styles.subtitle}>
      Inicia sesión para continuar
    </Text>

    {/* Formulario de Login */}
    <LoginForm />

    {/* Enlace para crear cuenta */}
    <Text style={styles.footer}>
      ¿No tienes una cuenta? <Text style={styles.link} onPress={goToRegister}>Regístrate</Text>
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
  image: {
    width: 180, 
    height: 180, 
    borderRadius: 100, 
    marginTop: -150,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5A189A',
    marginBottom: 30,
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
  marco:{
    marginTop: 15,
  },
  button: {
    backgroundColor: '#7B2CBF',
    borderColor: '#7B2CBF',
    borderRadius: 8,
    margin: 10,
  },
});
