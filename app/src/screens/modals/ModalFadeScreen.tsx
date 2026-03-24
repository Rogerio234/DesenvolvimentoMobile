import React, { useState } from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import modalStyles from '../../styles/modalStyles';
import theme from '../../styles/theme';

export function ModalFadeScreen() {
  const [visible, setVisible] = useState(false);
  const color = theme.colors.modalFade;

  return (
    <SafeAreaView style={[modalStyles.screenContainer, { backgroundColor: color + '10' }]}>
      <Text style={[modalStyles.headerText, { color }]}>
        Modo: FADE
      </Text>

      <Text style={modalStyles.description}>
        O modal do tipo "fade" aparece com uma transicao suave de transparencia, surgindo gradualmente na tela.
      </Text>

      <TouchableOpacity
        style={[modalStyles.mainButton, { backgroundColor: color }]}
        onPress={() => setVisible(true)}
      >
        <Text style={modalStyles.buttonText}>ABRIR MODAL FADE</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
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
            <Text style={modalStyles.modalTitle}>Animacao Fade</Text>
            <Text style={modalStyles.modalBody}>
              Esta transicao demonstra o comportamento nativo do tipo "fade". O modal aparece suavemente com transparencia.
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
