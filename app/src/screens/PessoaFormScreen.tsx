import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import api from '../services/api';
import FeedbackModal from '../components/FeedbackModal';

export default function PessoaFormScreen({ navigation, route }: any) {
  const pessoaId = route.params?.id ?? null;
  const editando = pessoaId !== null;

  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [salvando, setSalvando] = useState(false);
  const [carregando, setCarregando] = useState(editando);
  const [modal, setModal] = useState({ visivel: false, tipo: '' as any, mensagem: '' });

  const abrirModal = (tipo: any, mensagem: string) => setModal({ visivel: true, tipo, mensagem });
  const fecharModal = () => {
    const tipo = modal.tipo;
    setModal({ visivel: false, tipo: '', mensagem: '' });
    if (tipo === 'sucesso') navigation.goBack();
  };

  useEffect(() => {
    if (!editando) return;
    (async () => {
      try {
        const resp = await api.get(`/api/pessoas/${pessoaId}`);
        setNome(resp.data.nome);
        setIdade(String(resp.data.idade));
      } catch {
        abrirModal('erro', 'Nao foi possivel carregar os dados.');
      } finally {
        setCarregando(false);
      }
    })();
  }, []);

  const salvar = async () => {
    if (!nome.trim()) { abrirModal('erro', 'Nome e obrigatorio.'); return; }
    if (!idade.trim() || isNaN(Number(idade)) || Number(idade) <= 0) {
      abrirModal('erro', 'Idade invalida.'); return;
    }

    const payload = { nome: nome.trim(), idade: Number(idade) };
    try {
      setSalvando(true);
      if (editando) {
        await api.put(`/api/pessoas/${pessoaId}`, payload);
        abrirModal('sucesso', 'Pessoa atualizada com sucesso!');
      } else {
        await api.post('/api/pessoas', payload);
        abrirModal('sucesso', 'Pessoa cadastrada com sucesso!');
      }
    } catch {
      abrirModal('erro', 'Erro ao salvar. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#2563eb" /></View>;
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>{editando ? 'Editar Pessoa' : 'Nova Pessoa'}</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome completo" />

        <Text style={styles.label}>Idade</Text>
        <TextInput style={styles.input} value={idade} onChangeText={setIdade} placeholder="Idade" keyboardType="numeric" maxLength={3} />

        <TouchableOpacity style={[styles.botao, salvando && { opacity: 0.6 }]} onPress={salvar} disabled={salvando}>
          {salvando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>{editando ? 'Atualizar' : 'Cadastrar'}</Text>}
        </TouchableOpacity>
      </ScrollView>

      <FeedbackModal visivel={modal.visivel} tipo={modal.tipo} mensagem={modal.mensagem} onFechar={fecharModal} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  conteudo: { padding: 20, gap: 12 },
  titulo: { fontSize: 28, fontWeight: '800', color: '#0f172a', marginBottom: 8 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155' },
  input: { backgroundColor: '#fff', borderWidth: 1.5, borderColor: '#e2e8f0', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16 },
  botao: { backgroundColor: '#2563eb', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
