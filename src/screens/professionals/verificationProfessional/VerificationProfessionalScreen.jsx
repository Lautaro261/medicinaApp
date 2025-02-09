import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Button, Text, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { handleIntegrationMP } from '../../../utils/mercadoPago';
import { PaymentModal } from '../../../components/professional/paymentModal/PaymentModal';

export function VerificationProfessionalScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  // Función para navegar a la pantalla de profesionales
  const handleGoHome = () => {
    navigation.navigate("ProfessionalsScreen");
  };

  // Función para mostrar el modal de verificación
  const handleVerify = () => {
    setModalVisible(true);
  };

  // Función para continuar con el pago
  const handleContinuePayment = async () => {
    try {
      const paymentUrl = await handleIntegrationMP();
      if (paymentUrl) {
        navigation.navigate('WebView', { uri: paymentUrl });
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    }
  };

  return (
    <Layout style={styles.container}>
      {/* Imagen de éxito */}
      <Image 
        source={require('../../../../assets/img/completed_web.png')} 
        style={styles.successImage} 
        resizeMode="contain" 
      />
      {/* Mensaje de éxito */}
      <Text style={styles.successMessage}>¡Profesional creado exitosamente!</Text>

      {/* Información adicional sobre la verificación */}
      <Text style={styles.infoText}>
        Como profesional verificado, tu perfil recibirá un tilde azul, lo que brindará a los clientes
        una garantía de confianza y mayor visibilidad en nuestra plataforma.
      </Text>

      {/* Contenedor de botones */}
      <Layout style={styles.buttonsContainer}>
        {/* Botón para ir al inicio */}
        <Button
          style={styles.buttonSecondary}
          onPress={handleGoHome}
          activeOpacity={0.7}
          appearance='filled'
        >
          Ir al inicio
        </Button>

        {/* Botón para verificar */}
        <Button
          style={styles.buttonPrimary}
          onPress={handleVerify}
          activeOpacity={0.7}
          appearance='filled'
        >
          Quiero verificarme
        </Button>
      </Layout>

      {/* Modal de pago */}
      <PaymentModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onConfirm={handleContinuePayment} 
      />
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