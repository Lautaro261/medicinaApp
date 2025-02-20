import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./changePasswordForm.data";


export function ChangePasswordForm(props) {
  const { onClose } = props;
  const [showPassword, setShowPassword] = useState(false);

  const onShowPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const currentUser = getAuth().currentUser;

        const credentials = EmailAuthProvider.credential(
          currentUser.email,
          formValue.password
        );
        await reauthenticateWithCredential(currentUser, credentials); // Asegurarse de esperar la reautenticación

        console.log("USER", currentUser);
        console.log("PASSWORD", formValue.newPassword);

        await updatePassword(currentUser, formValue.newPassword);

        onClose();
        Toast.show({
          type: "success",
          text1: "✅ Contraseña cambiada con éxito",
        });
      } catch (error) {
        console.log('Error', error);
        onClose();
        Toast.show({
          type: "error",
          text1: "❌ Error al cambiar la contraseña",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Contraseña actual"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Nueva contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowPassword,
        }}
        onChangeText={(text) => formik.setFieldValue("newPassword", text)}
        errorMessage={formik.errors.newPassword}
      />
      <Input
        placeholder="Repite nueva contraseña"
        containerStyle={styles.input}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-off-outline" : "eye-outline",
          color: "#c2c2c2",
          onPress: onShowPassword,
        }}
        onChangeText={(text) =>
          formik.setFieldValue("confirmNewPassword", text)
        }
        errorMessage={formik.errors.confirmNewPassword}
      />
      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    content: {
      alignItems: "center",
      paddingVertical: 10,
    },
    input: {
      marginBottom: 20,
    },
    btnContainer: {
      width: "95%",
    },
    btn: {
      backgroundColor: "#5c179b",
    },
  });