import { View, Text, StyleSheet, Button } from 'react-native';
import * as Linking from 'expo-linking';
import { useState, useEffect } from 'react';
import { ACCESS_TOKEN } from '../../config.json';

// Función para generar la preferencia de Mercado Pago
const handleIntegrationMP = async (professionalId) => {
  const preferencia = {
    items: [
      {
        title: "Verificación de Servicio",
        description: "Adquisición de Verificado",
        quantity: 1,
        currency_id: "ARS",
        unit_price: 1,
      },
    ],
    back_urls: {
      success: `appcognikids://payment-status/success/${professionalId}`,
      failure: `appcognikids://payment-status/failure/${professionalId}`,
      pending: `appcognikids://payment-status/pending/${professionalId}`,
    },
    auto_return: "approved",
  };

  try {
    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`, // Asegúrate de que el token esté configurado correctamente
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferencia),
    });

    const data = await response.json();
    return data.init_point; // Devuelve la URL de pago
  } catch (error) {
    console.error("Error al generar la preferencia de pago:", error);
  }
};

// Componente TestPagoScreen
export const TestPagoScreen = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Función para manejar el pago
  const handlePayment = async () => {
    const professionalId = "123456"; // ID del profesional (ejemplo)
    const paymentUrl = await handleIntegrationMP(professionalId);

    // Redirigir a Mercado Pago para procesar el pago
    if (paymentUrl) {
      Linking.openURL(paymentUrl);
    }
  };

  // Manejo del deep linking para actualizar el estado de pago
  const handleDeepLink = (event) => {
    const { path } = Linking.parse(event.url);
    if (path.includes('payment-status')) {
      const status = path.split('/')[2]; // success, failure, pending
      setPaymentStatus(status); // Actualizamos el estado del pago
    }
  };

  useEffect(() => {
    // Escuchar eventos de deep link
    const linkingSubscription = Linking.addEventListener('url', handleDeepLink);

    // Verifica si la app fue abierta desde un deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    return () => {
      linkingSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.hola}>Hola</Text>
      <Button title="Pagar" onPress={handlePayment} />
      {paymentStatus && (
        <Text>
          Pago {paymentStatus === 'success' ? 'realizado' : paymentStatus === 'failure' ? 'fallido' : 'pendiente'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  hola: {
    fontSize: 24,
    marginBottom: 20,
  },
  pagoStatus: {
    marginTop: 20,
    fontSize: 18,
  },
});


