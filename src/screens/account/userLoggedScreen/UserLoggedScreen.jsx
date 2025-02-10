import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "@rneui/themed";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { LoadingModal } from "../../../components/shared/loadingModal/LoadingModal";
import { InfoUser } from "../../../components/account/infoUser/InfoUser";
import { AccountOptions } from "../../../components/account/AccountOptions";
import { useNavigation } from '@react-navigation/native';
import { screen } from "../../../utils/ScreenName";

export const UserLoggedScreen = () => {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [registrationCompleted, setRegistrationCompleted] = useState(null);
  const [userData, setUserData] = useState(null);
  const [verified, setVerified] = useState(false);
  const [_, setReload] = useState(false);

  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;
  const navigation = useNavigation();

  const goToVerificationProfessional = () => {
    if (!userData) {
      console.error("Error: userData no está disponible");
      return;
    }
    console.log("Antes de navegar a verificationProfessional:", { userId: userData.id});
    navigation.navigate(screen.professional.tab, {
      screen: screen.professional.verificationProfessional,
      params: {
        userId: userData.id,
      }
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData(data);
          setRegistrationCompleted(data.registrationCompleted || false);

          // Verificar si el usuario es profesional y obtener su estado de verificación
          if (data.role === "professional") {
            const professionalsRef = collection(db, "professionals");
            const q = query(professionalsRef, where("userId", "==", user.uid));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
              const professionalData = querySnapshot.docs[0].data();
              setVerified(professionalData.verified || false);
            }
          }
        } else {
          setRegistrationCompleted(false);
        }
      } catch (error) {
        console.error("Error obteniendo los datos del usuario:", error);
        setRegistrationCompleted(false);
      }
    };

    fetchUserData();
  }, [_]);

  const onReload = () => setReload((prevState) => !prevState);

  const logout = async () => {
    await signOut(auth);
  };

  if (registrationCompleted === null) {
    return <LoadingModal show text="Cargando datos..." />;
  }

  return (
    <View style={styles.container}>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} userData={userData} />

      {/* Mostrar mensaje si el usuario no completó su registro */}
      {!registrationCompleted && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            Debes completar tu registro en "Información general".
          </Text>
        </View>
      )}

      <AccountOptions onReload={onReload} />

      {/* Mensaje de verificación */}
      {userData?.role === "professional" && !verified ? (
        <View style={styles.verificationContainer}>
          <Text style={styles.verificationText}>
            Aun no estás verificado. ¿Quieres verificarte?
          </Text>
          <Button
            title="Verificar"
            buttonStyle={styles.btnVerifyStyles}
            titleStyle={styles.btnTextStyle}
            onPress={goToVerificationProfessional}
          />
        </View>
      ) : userData?.role === "professional" && verified ? (
        <Text style={styles.verifiedText}>¡Verificado! ✅</Text>
      ) : null}

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
  verificationContainer: {
    backgroundColor: "#FFD700",
    padding: 10,
    marginVertical: 15,
    borderRadius: 5,
  },
  verificationText: {
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
  },
  verifiedText: {
    textAlign: "center",
    color: "#008000",
    fontWeight: "bold",
    fontSize: 22,
    marginVertical: 15,
    marginBottom: 10,
    textAlign: 'center'
  },
  btnVerifyStyles: {
    marginTop: 10,
    backgroundColor: "#000000",
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