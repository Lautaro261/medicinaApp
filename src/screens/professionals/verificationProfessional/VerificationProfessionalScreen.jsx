import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { handleIntegrationMP } from '../../../utils/mercadoPago'; // Asegúrate de que la ruta sea la correcta

export function VerificationProfessionalScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleGoHome = () => {
    navigation.navigate("ProfessionalsScreen"); // Cambia este nombre si es necesario
  };

  const handleVerify = async () => {
    setModalVisible(true);
  };

  const handleContinuePayment = async () => {
    try {
      const paymentUrl = await handleIntegrationMP();
      if (paymentUrl) {
        // Abrimos la pasarela de Mercado Pago
        navigation.navigate('WebView', { uri: paymentUrl }); // Redirige a una pantalla que muestre la pasarela
      }
    } catch (error) {
      console.error("Error al procesar el pago:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successMessage}>¡Profesional creado exitosamente!</Text>
      <Text style={styles.infoText}>
        Como profesional verificado, tu perfil recibirá un tilde azul, lo que brindará a los clientes
        una garantía de confianza y mayor visibilidad en nuestra plataforma.
      </Text>
      
      <View style={styles.buttonsContainer}>
        <Button title="Ir al inicio" onPress={handleGoHome} />
        <Button title="Quiero verificarme" onPress={handleVerify} />
      </View>

      {/* Modal de Confirmación de Pago */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>La verificación tiene un coste de $100.</Text>
            <View style={styles.modalButtonsContainer}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Continuar con el pago" onPress={handleContinuePayment} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  infoText: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
    color: '#333',
  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

