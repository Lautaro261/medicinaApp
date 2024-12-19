import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { LoadingModal } from "../../../components/shared/loadingModal/LoadingModal";
import { ProfessionalsList } from "../../../components/Professionals/professionalsList/ProfessionalsList";
import { screen } from "../../../utils/ScreenName";
import { db } from '../../../utils/firebase';

export const ProfessionalsScreen = (props) => {
  const { navigation } = props;
  const [currentUser, setCurrentUser] = useState(null);
  const [professionals, setProfessionals] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "professionals"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      setProfessionals(snapshot.docs);
    });
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

      {currentUser && (
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
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#ffffff"
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
