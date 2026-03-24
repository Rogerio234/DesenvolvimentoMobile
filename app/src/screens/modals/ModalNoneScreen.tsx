import React, { useState } from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import modalStyles from '../../styles/modalStyles';
import theme from '../../styles/theme';

export function ModalNoneScreen() {
  const [visible, setVisible] = useState(false);
  const color = theme.colors.modalNone;

  return (
    <SafeAreaView style={[modalStyles.screenContainer, { backgroundColor: color + '10' }]}>
      <Text style={[modalStyles.headerText, { color }]}>
        Modo: NONE
      </Text>

      <Text style={modalStyles.description}>
        O modal do tipo "none" aparece instantaneamente, sem nenhuma animacao de transicao.
      </Text>

      <TouchableOpacity
        style={[modalStyles.mainButton, { backgroundColor: color }]}
        onPress={() => setVisible(true)}
      >
        <Text style={modalStyles.buttonText}>ABRIR MODAL NONE</Text>
      </TouchableOpacity>

      <Modal
        animationType="none"
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
            <Text style={modalStyles.modalTitle}>Animacao None</Text>
            <Text style={modalStyles.modalBody}>
              Esta transicao demonstra o comportamento do tipo "none". O modal aparece instantaneamente sem animacao.
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
