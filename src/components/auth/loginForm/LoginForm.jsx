import React, {useState} from 'react';
import { StyleSheet} from 'react-native';
import { useFormik } from 'formik';
import { Layout, Input, Button } from '@ui-kitten/components';
import { Icon } from '@rneui/themed';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils/ScreenName';
import { initialValues, validationSchema } from './loginForm.data';

//Todo: Agregar icono de ojo para ocultar la contraseña

//Todo: Agregar Toast from "react-native-toast-message"

//Todo: Agregar icono de ojo para ocultar la contraseña showPassword

//Todo: Agregar validacion a name

//Todo: Agregar Manejo de error para los inputs (creo que es con useInoutState)

//Todo agregar LoadingIndicator

export const LoginForm = () => {

  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const onShowHidePassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await signInWithEmailAndPassword(
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
          text1: "Usuario o contraseña incorrectos",
        }); */
      }
    },
  });

  return (
                   /* Contenedor */
        <Layout style={styles.container}>




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

                         {/* Boton Iniciar sesion */}
          <Button onPress={formik.handleSubmit} style={styles.button}>
            Iniciar sesión
          </Button>
          



        </Layout>




  );
};

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#F3EAFB', //Aquí hay que arregar los estilos
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
      backgroundColor: '#7B2CBF',
      borderColor: '#7B2CBF',
      borderRadius: 8,
      //width: '100%', //Aquí tambien hay que arreglar los estilos
    },
  });