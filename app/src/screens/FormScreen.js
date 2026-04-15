import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../config/firebaseConfig';

export default function FormScreen({ navigation }) {
  const [nomeCarro, setNomeCarro] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [valorAluguel, setValorAluguel] = useState('');
  const [dataAluguel, setDataAluguel] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!nomeCarro.trim() || !nomeCliente.trim() || !valorAluguel.trim() || !dataAluguel.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const valor = parseFloat(valorAluguel.replace(',', '.'));
    if (isNaN(valor) || valor <= 0) {
      Alert.alert('Erro', 'Digite um valor valido para o aluguel.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'alugueis'), {
        nomeCarro: nomeCarro.trim(),
        nomeCliente: nomeCliente.trim(),
        valorAluguel: valor,
        dataAluguel: dataAluguel.trim(),
        userId: auth.currentUser?.uid || '',
        criadoEm: new Date().toISOString(),
      });

      Alert.alert('Sucesso', 'Aluguel registrado com sucesso!');
      setNomeCarro('');
      setNomeCliente('');
      setValorAluguel('');
      setDataAluguel('');
    } catch (error) {
      Alert.alert('Erro', 'Nao foi possivel salvar o registro. Tente novamente.');
      console.error('Erro ao salvar aluguel:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Novo Aluguel</Text>
        <Text style={styles.subtitle}>Preencha os dados do aluguel</Text>

        <View style={styles.formCard}>
          <Text style={styles.label}>Nome do Carro</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Fiat Uno, Honda Civic..."
            value={nomeCarro}
            onChangeText={setNomeCarro}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Nome do Cliente</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome completo do cliente"
            value={nomeCliente}
            onChangeText={setNomeCliente}
            autoCapitalize="words"
          />

          <Text style={styles.label}>Valor do Aluguel (R$)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 150.00"
            value={valorAluguel}
            onChangeText={setValorAluguel}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Data do Aluguel</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 15/04/2026"
            value={dataAluguel}
            onChangeText={setDataAluguel}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Salvando...' : 'Registrar Aluguel'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 24,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#F5F7FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: '#212121',
  },
  button: {
    backgroundColor: '#1565C0',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: '#90CAF9',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
