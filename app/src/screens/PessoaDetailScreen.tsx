import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import api from '../services/api';
import FeedbackModal from '../components/FeedbackModal';
import ConfirmacaoModal from '../components/ConfirmacaoModal';

export default function PessoaDetailScreen({ navigation, route }: any) {
  const { id } = route.params;
  const [pessoa, setPessoa] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [excluindo, setExcluindo] = useState(false);
  const [feedback, setFeedback] = useState({ visivel: false, tipo: '' as any, mensagem: '' });
  const [confirmacao, setConfirmacao] = useState(false);

  const abrirFeedback = (tipo: any, mensagem: string) => setFeedback({ visivel: true, tipo, mensagem });
  const fecharFeedback = () => {
    const tipo = feedback.tipo;
    setFeedback({ visivel: false, tipo: '', mensagem: '' });
    if (tipo === 'sucesso') navigation.goBack();
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await api.get(`/api/pessoas/${id}`);
        setPessoa(resp.data);
      } catch {
        abrirFeedback('erro', 'Nao foi possivel carregar os detalhes.');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const excluir = async () => {
    setConfirmacao(false);
    try {
      setExcluindo(true);
      await api.delete(`/api/pessoas/${id}`);
      abrirFeedback('sucesso', 'Pessoa excluida com sucesso!');
    } catch {
      abrirFeedback('erro', 'Erro ao excluir.');
    } finally {
      setExcluindo(false);
    }
  };

  if (loading) return <View style={styles.center}><ActivityIndicator size="large" color="#2563eb" /></View>;
  if (!pessoa) return <View style={styles.center}><Text>Pessoa nao encontrada.</Text></View>;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
      <View style={styles.avatar}>
        <Text style={styles.avatarLetra}>{pessoa.nome.charAt(0).toUpperCase()}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.nome}>{pessoa.nome}</Text>
        <Text style={styles.info}>ID: {pessoa.id}</Text>
        <Text style={styles.info}>Idade: {pessoa.idade} anos</Text>
      </View>

      <View style={styles.acoes}>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#16a34a' }]} onPress={() => navigation.navigate('PessoaForm', { id: pessoa.id })}>
          <Text style={styles.botaoTexto}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#dc2626' }, excluindo && { opacity: 0.6 }]} onPress={() => setConfirmacao(true)} disabled={excluindo}>
          {excluindo ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Excluir</Text>}
        </TouchableOpacity>
      </View>

      <ConfirmacaoModal visivel={confirmacao} mensagem={`Excluir "${pessoa.nome}"? Esta acao nao pode ser desfeita.`} onConfirmar={excluir} onCancelar={() => setConfirmacao(false)} />
      <FeedbackModal visivel={feedback.visivel} tipo={feedback.tipo} mensagem={feedback.mensagem} onFechar={fecharFeedback} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  conteudo: { padding: 20, alignItems: 'center', gap: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#2563eb', justifyContent: 'center', alignItems: 'center' },
  avatarLetra: { fontSize: 36, fontWeight: '800', color: '#fff' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '100%', elevation: 2, alignItems: 'center', gap: 8 },
  nome: { fontSize: 22, fontWeight: '800', color: '#0f172a' },
  info: { fontSize: 15, color: '#64748b' },
  acoes: { flexDirection: 'row', gap: 12, width: '100%' },
  botao: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  botaoTexto: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
