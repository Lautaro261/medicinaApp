import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Button, Text } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { screen } from '../../../utils/ScreenName';

export function VerificationModal({ visible, onClose }) {
  const navigation = useNavigation();

  const handleClose = () => {
    onClose();
    navigation.navigate(screen.account.tab, {
        screen: screen.account.account
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>¡Verificación exitosa! ✅</Text>
          <Text style={styles.modalMessage}>
            Tu cuenta ha sido verificada correctamente. Ahora tienes mayor visibilidad en la plataforma.
          </Text>

          <Button style={styles.closeButton} onPress={handleClose}>
            Cerrar
          </Button>
        </View>
      </View>
    </Modal>
  );
}

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
  closeButton: {
    backgroundColor: '#5A189A',
    borderColor: "#5A189A",
    color: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
