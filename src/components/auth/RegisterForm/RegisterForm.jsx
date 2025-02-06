/* import React,{useState} from 'react';
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
        }); 
      }
    },
  });

  const showHidenPassword = () => setShowPassword((prevState) => !prevState);

  return (
    <Layout style={styles.container}>
      {/* Input Nombre }
      <Input
        placeholder="Nombre"
        value={formik.values.name}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        onBlur={formik.handleBlur('name')}
        style={styles.input}
      />

      {/* Input Correo }
      <Input
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Correo electrónico"
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        onBlur={formik.handleBlur('email')}
        style={styles.input}
      />

      {/* Input Contraseña }
      <Input
        autoCapitalize="none"
        placeholder="Contraseña"
        secureTextEntry
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        onBlur={formik.handleBlur('password')}
        style={styles.input}
      />

      {/* Input Repetir Contraseña }
      <Input
        autoCapitalize="none"
        placeholder="Repetir Contraseña"
        secureTextEntry
        value={formik.values.confirmPassword}
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        onBlur={formik.handleBlur('confirmPassword')}
        style={styles.input}
      />

      {/* Botón Registrar }
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
 */


import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFormik } from 'formik';
import { Layout, Input, Button, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { initialValues, validationSchema } from './registerForm.data';
import { screen } from '../../../utils/ScreenName';

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (!selectedRole) {
        console.log('Debe seleccionar un rol antes de registrarse.');
        return;
      }
      console.log("Formik", formValue)

      try {
        const auth = getAuth();
        const firestore = getFirestore();

        // Crear usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        const user = userCredential.user;

        // Crear documento en Firestore con los datos del usuario
        const userDocRef = doc(firestore, 'users', user.uid);
        await setDoc(userDocRef, {
          id: user.uid,
          email: formValue.email,
          first_name: formValue.first_name,
          last_name: formValue.last_name,
          role: selectedRole,
          verified: false,
          registroCompletado: false,
          createdAt: new Date().toISOString(),
        });

        // Redirigir según el rol
        navigation.navigate(screen.account.account);
      } catch (error) {
        console.log('Error al registrarse:', error);
      }
    },
  });

  return (
    <Layout style={styles.container}>
      {/* Input Nombre */}
      <Input
        placeholder="Nombre"
        value={formik.values.first_name}
        onChangeText={(text) => formik.setFieldValue("first_name", text)}
        style={styles.input}
      />

      {/* Input Apellido */}
      <Input
        placeholder="Apellido"
        value={formik.values.last_name}
        onChangeText={(text) => formik.setFieldValue("last_name", text)}
        style={styles.input}
      />

      {/* Input Correo */}
      <Input
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Correo electrónico"
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        style={styles.input}
      />

      {/* Input Contraseña */}
      <Input
        autoCapitalize="none"
        placeholder="Contraseña"
        secureTextEntry
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        style={styles.input}
      />

      {/* Input Repetir Contraseña */}
      <Input
        autoCapitalize="none"
        placeholder="Repetir Contraseña"
        secureTextEntry
        value={formik.values.confirmPassword}
        onChangeText={(text) => formik.setFieldValue("confirmPassword", text)}
        style={styles.input}
      />

      {/* Botones de selección de rol */}
      <Text category="s1" style={styles.label}>Selecciona tu rol:</Text>
      <View style={styles.roleContainer}>
        <Button
          onPress={() => setSelectedRole("cliente")}
          appearance={selectedRole === "cliente" ? "filled" : "outline"}
          style={styles.roleButton}
        >
          Cliente
        </Button>
        <Button
          onPress={() => setSelectedRole("profesional")}
          appearance={selectedRole === "profesional" ? "filled" : "outline"}
          style={styles.roleButton}
        >
          Profesional
        </Button>
      </View>

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
    backgroundColor: '#F3EAFB',
  },
  input: {
    marginBottom: 16,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderColor: '#D0B3F1',
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  label: {
    marginBottom: 8,
    color: '#6A3AB6',
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '100%',
  },
  roleButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#7B2CBF',
    borderColor: '#7B2CBF',
    borderRadius: 8,
  },
});

