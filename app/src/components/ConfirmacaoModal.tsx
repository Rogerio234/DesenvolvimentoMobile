import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  visivel: boolean;
  mensagem: string;
  onConfirmar: () => void;
  onCancelar: () => void;
}

export default function ConfirmacaoModal({ visivel, mensagem, onConfirmar, onCancelar }: Props) {
  return (
    <Modal transparent animationType="fade" visible={visivel} onRequestClose={onCancelar}>
      <View style={styles.overlay}>
        <View style={styles.caixa}>
          <Text style={styles.icone}>{'\u26A0'}</Text>
          <Text style={styles.titulo}>Atencao</Text>
          <Text style={styles.mensagem}>{mensagem}</Text>
          <View style={styles.acoes}>
            <TouchableOpacity style={[styles.botao, styles.botaoCancelar]} onPress={onCancelar}>
              <Text style={styles.textoCancelar}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.botao, styles.botaoConfirmar]} onPress={onConfirmar}>
              <Text style={styles.textoConfirmar}>Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  caixa: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    elevation: 8,
  },
  icone: { fontSize: 48 },
  titulo: { fontSize: 20, fontWeight: '800', color: '#0f172a', marginTop: 12 },
  mensagem: {
    fontSize: 15,
    color: '#475569',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 22,
  },
  acoes: { flexDirection: 'row', gap: 12, width: '100%' },
  botao: { flex: 1, paddingVertical: 13, borderRadius: 12, alignItems: 'center' },
  botaoCancelar: { backgroundColor: '#f1f5f9' },
  botaoConfirmar: { backgroundColor: '#dc2626' },
  textoCancelar: { color: '#475569', fontWeight: '700', fontSize: 15 },
  textoConfirmar: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
