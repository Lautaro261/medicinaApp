import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Button, Text, Layout } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils/ScreenName';

export const VerificationModal = ({ visible, onClose, onConfirm }) => {
  const navigation = useNavigation();

  // Al cerrar el modal, navega a la cuenta
  const handleClose = () => {
    onClose();
    navigation.navigate(screen.account.tab, {
      screen: screen.account.account,
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <Layout style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Verificación ✅</Text>
          <Text style={styles.modalMessage}>
            El costo de verificación es de $500. Tu cuenta será verificada. A partir de ahora, tendrás mayor visibilidad en la plataforma.
          </Text>
          <View style={styles.buttonsContainer}>
            <Button 
            style={styles.buttonCancel}
            onPress={handleClose}
            appearance="filled"
            activeOpacity={0.7}
            >
              Cancelar
            </Button>
            <Button 
            style={styles.buttonPrimary}
            onPress={onConfirm}
            appearance="filled"
            activeOpacity={0.7}
            >
              Continuar con el pago
            </Button>
          </View>
        </Layout>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5A189A',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonPrimary: {
    backgroundColor: '#5A189A',
    borderColor: "#7B2CBF",
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  buttonCancel: {
    backgroundColor: '#ba1c1c',
    borderColor: "#ba1c1c",
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
});
