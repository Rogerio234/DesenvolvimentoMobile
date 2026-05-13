import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  visivel: boolean;
  tipo: 'sucesso' | 'erro' | '';
  mensagem: string;
  onFechar: () => void;
}

export default function FeedbackModal({ visivel, tipo, mensagem, onFechar }: Props) {
  const ehSucesso = tipo === 'sucesso';

  return (
    <Modal transparent animationType="fade" visible={visivel} onRequestClose={onFechar}>
      <View style={styles.overlay}>
        <View style={styles.caixa}>
          <Text style={[styles.icone, { color: ehSucesso ? '#16a34a' : '#dc2626' }]}>
            {ehSucesso ? '\u2714' : '\u2716'}
          </Text>
          <Text style={styles.mensagem}>{mensagem}</Text>
          <TouchableOpacity
            style={[styles.botao, ehSucesso ? styles.botaoSucesso : styles.botaoErro]}
            onPress={onFechar}
          >
            <Text style={styles.textoBotao}>OK</Text>
          </TouchableOpacity>
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
  icone: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  mensagem: {
    fontSize: 16,
    color: '#334155',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
    lineHeight: 24,
  },
  botao: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
  },
  botaoSucesso: { backgroundColor: '#16a34a' },
  botaoErro: { backgroundColor: '#dc2626' },
  textoBotao: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
