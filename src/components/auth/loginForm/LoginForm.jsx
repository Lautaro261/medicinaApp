import React from 'react';
import { StyleSheet} from 'react-native';
import { useFormik } from 'formik';
import { Layout, Input, Button } from '@ui-kitten/components';

export const LoginForm = () => {

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        onSubmit: (values) => {
          console.log('Datos enviados:', values);
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