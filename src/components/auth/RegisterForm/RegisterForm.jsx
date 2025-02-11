import React, { useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { useFormik } from 'formik';
import { Layout, Input, Button, Text, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { initialValues, validationSchema } from './registerForm.data';
import { screen } from '../../../utils/ScreenName';
import Toast from 'react-native-toast-message';

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const navigation = useNavigation();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword((prev) => !prev);

  const renderPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
      <Icon {...props} name={showPassword ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  const renderConfirmPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleConfirmPasswordVisibility}>
      <Icon {...props} name={showConfirmPassword ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      if (!selectedRole) {
        Toast.show({
          type: 'error',
          text1: '❌ Debes seleccionar un rol.',
          visibilityTime: 2500,
        });
        return;
      }

      try {
        const auth = getAuth();
        const firestore = getFirestore();

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        const user = userCredential.user;

        const userDocRef = doc(firestore, 'users', user.uid);
        await setDoc(userDocRef, {
          id: user.uid,
          email: formValue.email,
          first_name: formValue.first_name,
          last_name: formValue.last_name,
          role: selectedRole,
          registrationCompleted: false,
          createdAt: new Date().toISOString(),
        });

        navigation.navigate(screen.account.account);
      } catch (error) {
        console.log('Error al registrarse:', error);
        Toast.show({
          type: 'error',
          text1: '❌ Error al registrar',
          text2: 'Hubo un problema al registrar tu cuenta.',
          visibilityTime: 2500,
        });
      }
    },
  });

  // Función para obtener el icono del rol seleccionado
  const renderRoleIcon = (role) => {
    switch (role) {
      case 'client':
        return <Icon name="person-outline" width={24} height={24} />;
      case 'professional':
        return <Icon name="briefcase-outline" width={24} height={24} />;
      default:
        return null;
    }
  };

  return (
    <Layout style={styles.container}>
      {/* Nombre */}
      <Input
        placeholder="Nombre"
        value={formik.values.first_name}
        onChangeText={(text) => formik.setFieldValue('first_name', text)}
        style={styles.input}
        status={formik.touched.first_name && formik.errors.first_name ? 'danger' : 'basic'}
      />
      {formik.touched.first_name && formik.errors.first_name && (
        <Text style={styles.errorText}>{formik.errors.first_name}</Text>
      )}

      {/* Apellido */}
      <Input
        placeholder="Apellido"
        value={formik.values.last_name}
        onChangeText={(text) => formik.setFieldValue('last_name', text)}
        style={styles.input}
        status={formik.touched.last_name && formik.errors.last_name ? 'danger' : 'basic'}
      />
      {formik.touched.last_name && formik.errors.last_name && (
        <Text style={styles.errorText}>{formik.errors.last_name}</Text>
      )}

      {/* Correo electrónico */}
      <Input
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Correo electrónico"
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue('email', text)}
        style={styles.input}
        status={formik.touched.email && formik.errors.email ? 'danger' : 'basic'}
      />
      {formik.touched.email && formik.errors.email && (
        <Text style={styles.errorText}>{formik.errors.email}</Text>
      )}

      {/* Contraseña */}
      <Input
        autoCapitalize="none"
        placeholder="Contraseña"
        secureTextEntry={showPassword}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue('password', text)}
        style={styles.input}
        status={formik.touched.password && formik.errors.password ? 'danger' : 'basic'}
        accessoryRight={renderPasswordIcon}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      {/* Repetir contraseña */}
      <Input
        autoCapitalize="none"
        placeholder="Repetir Contraseña"
        secureTextEntry={showConfirmPassword}
        value={formik.values.confirmPassword}
        onChangeText={(text) => formik.setFieldValue('confirmPassword', text)}
        style={styles.input}
        status={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'danger' : 'basic'}
        accessoryRight={renderConfirmPasswordIcon}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <Text style={styles.errorText}>{formik.errors.confirmPassword}</Text>
      )}

      {/* Roles */}
      <Text category="s1" style={styles.label}>Selecciona tu rol:</Text>
      <View style={styles.roleContainer}>
        <Button
          onPress={() => setSelectedRole('client')}
          appearance={selectedRole === 'client' ? 'filled' : 'outline'}
          style={styles.roleButton}
          accessoryLeft={() => renderRoleIcon('client')}
        >
          Client
        </Button>
        <Button
          onPress={() => setSelectedRole('professional')}
          appearance={selectedRole === 'professional' ? 'filled' : 'outline'}
          style={styles.roleButton}
          accessoryLeft={() => renderRoleIcon('professional')}
        >
          Professional
        </Button>
      </View>

      {/* Botón Registrar */}
      <Button
      onPress={formik.handleSubmit}
      style={styles.button}
      activeOpacity={0.7}
      appearance='filled'
      >
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
    fontWeight: 'bold',
    color: '#6A3AB6',
    
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  roleButton: {
    flex: 1,
    marginHorizontal: 4, // Cambiado de 4 a 2 para hacer los botones más angostos
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#7B2CBF',
    borderColor: '#7B2CBF',
    borderRadius: 8,
    paddingHorizontal: 30,
  },
  errorText: {
    color: '#D9534F',
    marginTop: 4,
    fontSize: 12,
  },
});



