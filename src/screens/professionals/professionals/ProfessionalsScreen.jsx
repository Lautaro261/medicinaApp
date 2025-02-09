import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, query, doc, getDoc, orderBy } from "firebase/firestore";
import { LoadingModal } from "../../../components/shared/loadingModal/LoadingModal";
import { ProfessionalsList } from "../../../components/Professionals/professionalsList/ProfessionalsList";
import { screen } from "../../../utils/ScreenName";
import { db } from "../../../utils/firebase";

export const ProfessionalsScreen = (props) => {
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [professionals, setProfessionals] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await fetchUserRole(user.uid);
      } else {
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserRole = async (uid) => {
    try {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserRole(userSnap.data().role);
      } else {
        setUserRole(null);
      }
    } catch (error) {
      console.error("Error al obtener el rol del usuario:", error);
      setUserRole(null);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "professionals"), orderBy("verified", "desc"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProfessionals(snapshot.docs);
    });

    return () => unsubscribe();
  }, []);

  const goToAddProfessional = () => {
    navigation.navigate(screen.professional.addProfessional);
  };

  return (
    <View style={styles.content}>
      {!professionals ? (
        <LoadingModal show text="Cargando..." />
      ) : (
        <ProfessionalsList professionals={professionals} />
      )}

      {currentUser && userRole === "professional" && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#00a680"
          containerStyle={styles.btnContainer}
          onPress={goToAddProfessional}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});


/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // Fondo gris claro
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7B2CBF', // Morado intenso para el botón
  },
}); */
