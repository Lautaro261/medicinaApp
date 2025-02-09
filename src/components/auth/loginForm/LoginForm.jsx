import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useFormik } from "formik";
import { Layout, Input, Button, Icon } from "@ui-kitten/components";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/ScreenName";
import { initialValues, validationSchema } from "./loginForm.data";
import Toast from "react-native-toast-message";

export const LoginForm = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const navigation = useNavigation();

  const toggleSecureEntry = () => {
    setSecureTextEntry((prev) => !prev);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const user = await signInWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        console.log("user:", user);
        navigation.navigate(screen.account.account);
      } catch (error) {
        console.log("Error catch:", { error });
        Toast.show({
          type: "error",
          text1: "❌ Usuario o contraseña incorrectos",
          text2: "Verifica tus credenciales y vuelve a intentarlo.",
          visibilityTime: 2500,
          text1Style: { fontSize: 14, fontWeight: "bold" },
          text2Style: { fontSize: 12 },
        });
      }
    },
  });

  return (
    <Layout style={styles.container}>
      {/* Input Correo */}
      <Input
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Correo electrónico"
        value={formik.values.email}
        onChangeText={formik.handleChange("email")}
        onBlur={formik.handleBlur("email")}
        status={formik.touched.email && formik.errors.email ? "danger" : ""}
        caption={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
        style={styles.input}
      />

      {/* Input Contraseña con botón de mostrar/ocultar */}
      <Input
        autoCapitalize="none"
        placeholder="Contraseña"
        secureTextEntry={secureTextEntry}
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        accessoryRight={renderIcon}
        status={formik.touched.password && formik.errors.password ? "danger" : ""}
        caption={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
        style={styles.input}
      />

      {/* Botón Iniciar sesión */}
      <Button
        onPress={formik.handleSubmit}
        style={styles.button}
        appearance="filled"
        activeOpacity={0.7}
      >
        Iniciar sesión
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F3EAFB", 
  },
  input: {
    marginBottom: 16,
    width: "100%",
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderColor: "#D0B3F1", 
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: "#7B2CBF",
    borderColor: "#7B2CBF",
    borderRadius: 8,
    marginTop: 10, 
  },
});



//Todo agregar LoadingIndicator