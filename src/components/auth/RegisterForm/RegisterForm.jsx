import React,{useState} from 'react';
import { StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { Layout, Input, Button } from '@ui-kitten/components';
import { screen } from '../../../utils/ScreenName';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initialValues, validationSchema } from './registerForm.data';

//Todo: Agregar icono de ojo para ocultar la contraseña showPassword

//Todo: Agregar Toast from "react-native-toast-message"

//Todo: Agregar validacion a name

//Todo: Agregar Manejo de error para los inputs (creo que es con useInoutState)

//Todo agregar LoadingIndicator

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate(screen.account.account);
      } catch (error) {
        console.log('Error catch:',{error} )
/*         Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al registrarse, intentelo mas tarde",
        }); */
      }
    },
  });

  const showHidenPassword = () => setShowPassword((prevState) => !prevState);

  return (
    <Layout style={styles.container}>
      {/* Input Nombre */}
      <Input
        placeholder="Nombre"
        value={formik.values.name}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        onBlur={formik.handleBlur('name')}
        style={styles.input}
      />

      {/* Input Correo */}
      <Input
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Correo electrónico"
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        onBlur={formik.handleBlur('email')}
        style={styles.input}
      />

      {/* Input Contraseña */}
      <Input
        autoCapitalize="none"
        placeholder="Contraseña"
        secureTextEntry
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        onBlur={formik.handleBlur('password')}
        style={styles.input}
      />

      {/* Input Repetir Contraseña */}
      <Input
        autoCapitalize="none"
        placeholder="Repetir Contraseña"
        secureTextEntry
        value={formik.values.confirmPassword}
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
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
