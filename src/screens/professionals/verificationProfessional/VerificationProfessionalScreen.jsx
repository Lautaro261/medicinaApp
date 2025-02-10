import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Button, Text, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { screen } from "../../../utils/ScreenName";
import { VerificationModal } from "../../../components/shared/verificationModal/VerificationModal";

export function VerificationProfessionalScreen({ route }) {

  const [verifying, setVerifying] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const userId = route.params?.userId;  

  /** Navega a la pantalla de profesionales */
  const handleGoHome = () => {
    console.log("Navegando a la pantalla de profesionales");
    navigation.navigate(screen.professional.tab,{
      screen: screen.professional.professionals
    });
  };

  /** Inicia el proceso de verificación del profesional */
  const handleVerify = async () => {
    if (!userId) return;

    setVerifying(true);
    await updateProfessionalVerified(userId);
    setVerifying(false);
    setModalVisible(true);
  };

  /** Actualiza la propiedad "verified" en Firestore */
  const updateProfessionalVerified = async (userId) => {
    const db = getFirestore();
    try {
      const professionalsRef = collection(db, "professionals");
      const q = query(professionalsRef, where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) return;

      const professionalDoc = querySnapshot.docs[0]; 
      const docId = professionalDoc.id;  

      const professionalRef = doc(db, "professionals", docId);
      await updateDoc(professionalRef, { verified: true });
    } catch (error) {
      console.error("Error al actualizar la verificación:", error);
    }
  };

  return (
    <Layout style={styles.container}>
      <Image 
        source={require('../../../../assets/img/completed_web.png')} 
        style={styles.successImage} 
        resizeMode="contain" 
      />
      <Text style={styles.successMessage}>¡Profesional creado exitosamente!</Text>

      <Text style={styles.infoText}>
        Como profesional verificado, tu perfil recibirá un tilde azul, lo que brindará a los clientes
        una garantía de confianza y mayor visibilidad en nuestra plataforma.
      </Text>

      <Layout style={styles.buttonsContainer}>
        <Button
          style={styles.buttonSecondary}
          onPress={handleGoHome}
          appearance='filled'
        >
          Ir al inicio
        </Button>

        <Button
          style={styles.buttonPrimary}
          onPress={handleVerify}
          appearance='filled'
          disabled={verifying}
        >
          {verifying ? "Verificando..." : "Verificarme"}
        </Button>
      </Layout>

      {/* Modal separado en otro componente */}
      <VerificationModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EAFB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  successImage: {
    width: '80%',
    height: undefined, 
    aspectRatio: 1, 
    marginBottom: 20,
  },
  successMessage: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#14b8a6',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#F3EAFB',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
    gap: 20,
    backgroundColor: '#F3EAFB',
  },
  buttonPrimary: {
    backgroundColor: '#5A189A', 
    borderColor: "#5A189A",
    color: '#FFFFFF', 
    padding: 10,
    borderRadius: 8,
    width: '45%',
  },
  buttonSecondary: {
    backgroundColor: '#5d5c5c', 
    borderColor: "#5d5c5c",
    color: '#FFFFFF', 
    padding: 10,
    borderRadius: 8,
    width: '40%',
  },
});
