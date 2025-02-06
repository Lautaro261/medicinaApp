/* import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";
import { LoadingModal } from "../../../components/shared/loadingModal/LoadingModal";
import { InfoUser } from "../../../components/account/infoUser/InfoUser";
import { AccountOptions } from "../../../components/account/AccountOptions";


export const UserLoggedScreen=()=> {
   const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [_, setReload] = useState(false);

  const onReload = () => setReload((prevState) => !prevState);

   const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />

      <AccountOptions onReload={onReload} />

      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnStyles}
        titleStyle={styles.btnTextStyle}
        onPress={logout}
      />

      <LoadingModal show={loading} text={loadingText} />
    </View>
  );
}


 const styles = StyleSheet.create({
  container:{
    backgroundColor:"#F3EAFB ",
  },
    btnStyles: {
      marginTop: 30,
      paddingVertical: 10,
      borderRadius: 0,
      backgroundColor: "#000000",
      borderTopWidth: 1,
      borderTopColor: "#e3e3e3",
      borderBottomWidth: 1,
      borderBottomColor: "#e3e3e3",
    },
    btnTextStyle: {
      color: "#fefefe",
    },
  }); */

  import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { LoadingModal } from "../../../components/shared/loadingModal/LoadingModal";
import { InfoUser } from "../../../components/account/infoUser/InfoUser";
import { AccountOptions } from "../../../components/account/AccountOptions";

export const UserLoggedScreen = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [registrationCompleted, setRegistrationCompleted] = useState(null);
  const [_, setReload] = useState(false);

  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setRegistrationCompleted(userDoc.data().registrationCompleted || false);
        } else {
          setRegistrationCompleted(false);
        }
      } catch (error) {
        console.error("Error obteniendo los datos del usuario:", error);
        setRegistrationCompleted(false);
      }
    };

    fetchUserData();
  }, [_]); // Se ejecuta cuando cambia `_`, forzando la recarga

  const onReload = () => setReload((prevState) => !prevState);

  const logout = async () => {
    await signOut(auth);
  };

  if (registrationCompleted === null) {
    return <LoadingModal show text="Cargando datos..." />;
  }

  return (
    <View style={styles.container}>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />

      {/* Mostrar mensaje si el usuario no completó su registro */}
      {!registrationCompleted && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            Debes completar tu registro en "Información general".
          </Text>
        </View>
      )}

      <AccountOptions onReload={onReload} />

      <Button
        title="Cerrar sesión"
        buttonStyle={styles.btnStyles}
        titleStyle={styles.btnTextStyle}
        onPress={logout}
      />

      <LoadingModal show={loading} text={loadingText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3EAFB",
    flex: 1,
    padding: 20,
  },
  warningContainer: {
    backgroundColor: "#FFD700",
    padding: 10,
    marginVertical: 15,
    borderRadius: 5,
  },
  warningText: {
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
  },
  btnStyles: {
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 0,
    backgroundColor: "#000000",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
  btnTextStyle: {
    color: "#fefefe",
  },
});

  