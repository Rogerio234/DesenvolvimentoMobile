import React, { useState } from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import modalStyles from '../../styles/modalStyles';
import theme from '../../styles/theme';

export function ModalSlideScreen() {
  const [visible, setVisible] = useState(false);
  const color = theme.colors.modalSlide;

  return (
    <SafeAreaView style={[modalStyles.screenContainer, { backgroundColor: color + '10' }]}>
      <Text style={[modalStyles.headerText, { color }]}>
        Modo: SLIDE
      </Text>

      <Text style={modalStyles.description}>
        O modal do tipo "slide" entra pela parte inferior da tela, deslizando de baixo para cima.
      </Text>

      <TouchableOpacity
        style={[modalStyles.mainButton, { backgroundColor: color }]}
        onPress={() => setVisible(true)}
      >
        <Text style={modalStyles.buttonText}>ABRIR MODAL SLIDE</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
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
            <View style={[modalStyles.colorIndicator, { backgroundColor: color }]} />
            <Text style={modalStyles.modalTitle}>Animacao Slide</Text>
            <Text style={modalStyles.modalBody}>
              Esta transicao demonstra o comportamento nativo do tipo "slide". O modal desliza de baixo para cima.
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
