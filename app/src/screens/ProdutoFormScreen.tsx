import React, { useEffect, useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import api from '../services/api';
import FeedbackModal from '../components/FeedbackModal';

export default function ProdutoFormScreen({ navigation, route }: any) {
  const produtoId = route.params?.id ?? null;
  const editando = produtoId !== null;

  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [valor, setValor] = useState('');
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
  if (!editando) {
    // Caso o usuário entre em "Novo" após ter aberto um "Editar", limpamos os campos
    setNome('');
    setQuantidade('');
    setValor('');
    return;
  }
  
  // Função de busca (já está correta no seu código)
  const carregarDados = async () => {
    try {
      setCarregando(true);
      const resp = await api.get(`/api/produtos/${produtoId}`);
      setNome(resp.data.nome);
      setQuantidade(String(resp.data.quantidade));
      setValor(String(resp.data.valor));
    } catch {
      abrirModal('erro', 'Não foi possível carregar os dados.');
    } finally {
      setCarregando(false);
    }
  };

  carregarDados();
}, [produtoId]); // Adicione produtoId como dependência

  const salvar = async () => {
    if (!nome.trim()) { abrirModal('erro', 'Nome e obrigatorio.'); return; }
    if (!quantidade.trim() || isNaN(Number(quantidade)) || Number(quantidade) < 0) {
      abrirModal('erro', 'Quantidade invalida.'); return;
    }
    if (!valor.trim() || isNaN(Number(valor)) || Number(valor) <= 0) {
      abrirModal('erro', 'Valor invalido.'); return;
    }

    const payload = { nome: nome.trim(), quantidade: Number(quantidade), valor: Number(valor) };
    try {
      setSalvando(true);
      if (editando) {
        await api.put(`/api/produtos/${produtoId}`, payload);
        abrirModal('sucesso', 'Produto atualizado com sucesso!');
      } else {
        await api.post('/api/produtos', payload);
        abrirModal('sucesso', 'Produto cadastrado com sucesso!');
      }
    } catch {
      abrirModal('erro', 'Erro ao salvar. Tente novamente.');
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) return <View style={styles.center}><ActivityIndicator size="large" color="#2563eb" /></View>;

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.conteudo} keyboardShouldPersistTaps="handled">
        <Text style={styles.titulo}>{editando ? 'Editar Produto' : 'Novo Produto'}</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Nome do produto" />

        <Text style={styles.label}>Quantidade</Text>
        <TextInput style={styles.input} value={quantidade} onChangeText={setQuantidade} placeholder="Quantidade" keyboardType="numeric" />

        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput style={styles.input} value={valor} onChangeText={setValor} placeholder="0.00" keyboardType="decimal-pad" />

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
