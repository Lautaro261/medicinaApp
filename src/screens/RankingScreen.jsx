import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { map } from "lodash";
import { db } from "../utils/firebase";
import { ProfessionalRanking } from "../components/Professionals/professionalRanking/ProfessionalRanking";
import { LoadingModal } from "../components/shared/loadingModal/LoadingModal"; 


export const RankingScreen = () => {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const q = query(
      collection(db, "professionals"),
      orderBy("ratingMedia", "desc"),
      limit(10)
    );

    // Muestra el modal al comenzar la carga
    setLoading(true);

    onSnapshot(q, (snapshot) => {
      const professionalsData = snapshot.docs.map(doc => doc.data());
      setProfessionals(professionalsData);
      setLoading(false); // Oculta el modal después de cargar los datos
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Muestra el modal de carga si "loading" es verdadero */}
      <LoadingModal show={loading} text="Cargando profesionales..." /> {/* Implementación del LoadingModal */}
      
      {/* Validamos si hay profesionales para renderizar */}
      {professionals.length > 0 ? (
        map(professionals, (professional, index) => (
          <ProfessionalRanking
            key={index}
            index={index}
            professional={professional}
          />
        ))
      ) : (
        !loading && <Text>No se encontraron profesionales.</Text> 
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3EAFB",
  },
});


