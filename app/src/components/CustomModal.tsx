import React, { useState } from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import modalStyles from '../styles/modalStyles';

interface CustomModalScreenProps {
  animation: 'slide' | 'fade' | 'none';
  themeColor: string;
}

/**
 * Componente CustomModalScreen reutilizavel
 * @param animation - Recebe 'slide', 'fade' ou 'none' para definir a transicao.
 * @param themeColor - Recebe uma cor em Hexadecimal para personalizar a interface.
 */
export function CustomModalScreen({ animation, themeColor }: CustomModalScreenProps) {
  const [visible, setVisible] = useState(false);

  return (
    <SafeAreaView style={[modalStyles.screenContainer, { backgroundColor: themeColor + '10' }]}>
      <Text style={[modalStyles.headerText, { color: themeColor }]}>
        Modo: {animation.toUpperCase()}
      </Text>

      <Text style={modalStyles.description}>
        Demonstracao do modal com animacao do tipo "{animation}".
      </Text>

      <TouchableOpacity
        style={[modalStyles.mainButton, { backgroundColor: themeColor }]}
        onPress={() => setVisible(true)}
      >
        <Text style={modalStyles.buttonText}>ABRIR MODAL {animation.toUpperCase()}</Text>
      </TouchableOpacity>

      <Modal
        animationType={animation}
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={modalStyles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setVisible(false)}
        >
          <View style={modalStyles.modalCard}>
            <View style={[modalStyles.colorIndicator, { backgroundColor: themeColor }]} />
            <Text style={modalStyles.modalTitle}>Animacao {animation}</Text>
            <Text style={modalStyles.modalBody}>
              Esta transicao demonstra o comportamento nativo do tipo "{animation}".
            </Text>
            <TouchableOpacity
              style={modalStyles.closeButton}
              onPress={() => setVisible(false)}
            >
              <Text style={modalStyles.closeButtonText}>FECHAR</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
