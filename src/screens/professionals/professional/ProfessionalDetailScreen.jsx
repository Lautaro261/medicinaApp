import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions, StyleSheet, Text } from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { Loading } from "../../../components/shared/loading/Loading";
import { Carousel } from "../../../components/shared/carousel/Carousel";
import { Header } from "../../../components/professional/Header/Header";
import { Info } from "../../../components/professional/info/Info";
import { BtnReviewForm } from "../../../components/professional/btnReviewForm/BtnReviewForm";
import { Reviews } from "../../../components/professional/reviews/Reviews";
//import { Carousel, Loading } from "../../../components/Shared";
//import {Header,Info,BtnReviewForm,Reviews,BtnFavorite} from "../../../components/Restaurant";
import { db } from "../../../utils/firebase";

const { width } = Dimensions.get("window");

export const ProfessionalDetailsScreen = (props) => {
  const { route } = props;
  const [professional, setProfessional] = useState(null);

  useEffect(() => {
    setProfessional(null);
    onSnapshot(doc(db, "professionals", route.params.id), (doc) => {
      console.log("DETALLE",doc.data());
      setProfessional(doc.data());
    });
  }, [route.params.id]);

  if (!professional) return <Loading show text="Cargando profesionales" />;

  return (
    <ScrollView style={styles.content}>
      <Carousel arrayImages={professional.images} height={250} width={width} /> 
      <Header professional={professional} />
      <Info professional={professional} />
      <BtnReviewForm idProfessional={route.params.id} />
      <Reviews idProfessional={route.params.id} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
  },
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