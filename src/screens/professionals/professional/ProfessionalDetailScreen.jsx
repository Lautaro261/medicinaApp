import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions, StyleSheet } from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { LoadingModal } from "../../../components/shared/loadingModal/LoadingModal"; // Cambiado a LoadingModal
import { Carousel } from "../../../components/shared/carousel/Carousel";
import { Header } from "../../../components/professional/Header/Header";
import { Info } from "../../../components/professional/info/Info";
import { BtnReviewForm } from "../../../components/professional/btnReviewForm/BtnReviewForm";
import { Reviews } from "../../../components/professional/reviews/Reviews";
import { Button } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/ScreenName";
import { db } from "../../../utils/firebase";

const { width } = Dimensions.get("window");

export const ProfessionalDetailsScreen = (props) => {
  const { route } = props;
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigation = useNavigation();

  const goToAppointments = () => {
    navigation.navigate(screen.appointment.tab, {
      screen: screen.appointment.availableAppointments,
      params: {
        id: professional.id,
        name: professional.name
      }
    });
  };

  useEffect(() => {
    setProfessional(null);
    setLoading(true); // Iniciar carga
    const unsubscribe = onSnapshot(doc(db, "professionals", route.params.id), (doc) => {
      setProfessional(doc.data());
      setLoading(false); // Finalizar carga
    });
    return () => unsubscribe(); // Limpiar suscripción
  }, [route.params.id]);

  return (
    <>
      <LoadingModal show={loading} text="Cargando profesionales..." /> {/* Implementación del LoadingModal */}
      {professional && (
        <ScrollView style={styles.content}>
          <Carousel arrayImages={professional.images} height={250} width={width} />
          <Header professional={professional} />


          <Button
          onPress={goToAppointments}
          style={styles.button}
          appearance="filled"
          activeOpacity={0.7}
          >Obtener Turno</Button>


          <Info professional={professional} />
          
          <BtnReviewForm idProfessional={route.params.id} />
          <Reviews idProfessional={route.params.id} />

        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 24,
    backgroundColor: "#7B2CBF", // Morado intenso
    borderColor: "#7B2CBF",
    borderRadius: 8,
    marginHorizontal: 60,
  }
});


/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3EAFB", // Fondo morado claro
    padding: 16,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "#FFF",
    borderColor: "#D0B3F1", // Morado claro en bordes
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  name: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#5A189A", // Morado oscuro
  },
  specialty: {
    marginTop: 8,
    fontSize: 18,
    color: "#6A3AB6", // Morado medio
  },
  location: {
    marginTop: 4,
    fontSize: 16,
    color: "#7D8A8C", // Gris suave
  },
  description: {
    marginTop: 16,
    fontSize: 14,
    color: "#585858", // Gris oscuro
  },
  button: {
    marginTop: 24,
    backgroundColor: "#7B2CBF", // Morado intenso
    borderColor: "#7B2CBF",
    borderRadius: 8,
  },
});
 */


