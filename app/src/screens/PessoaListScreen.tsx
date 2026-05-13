import React, { useCallback, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, ActivityIndicator,
  RefreshControl, TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';
import FeedbackModal from '../components/FeedbackModal';

export default function PessoaListScreen({ navigation }: any) {
  const [pessoas, setPessoas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState({ visivel: false, tipo: '' as any, mensagem: '' });

  const abrirModal = (tipo: any, mensagem: string) => setModal({ visivel: true, tipo, mensagem });
  const fecharModal = () => setModal({ visivel: false, tipo: '', mensagem: '' });

  const carregarPessoas = async () => {
    try {
      setLoading(true);
      const resp = await api.get('/api/pessoas');
      setPessoas(resp.data);
    } catch {
      abrirModal('erro', 'Nao foi possivel carregar a lista de pessoas.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarPessoas();
    setRefreshing(false);
  };

  useFocusEffect(useCallback(() => { carregarPessoas(); }, []));

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Pessoas ({pessoas.length})</Text>
        <TouchableOpacity style={styles.botaoNovo} onPress={() => navigation.navigate('PessoaForm')}>
          <Text style={styles.botaoNovoTexto}>+ Nova</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={pessoas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('PessoaDetail', { id: item.id })}
          >
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.info}>{item.idade} anos | ID: {item.id}</Text>
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma pessoa cadastrada.</Text>}
      />

      <FeedbackModal visivel={modal.visivel} tipo={modal.tipo} mensagem={modal.mensagem} onFechar={fecharModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  titulo: { fontSize: 24, fontWeight: '800', color: '#0f172a' },
  botaoNovo: { backgroundColor: '#2563eb', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  botaoNovoTexto: { color: '#fff', fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, elevation: 2 },
  nome: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  info: { fontSize: 14, color: '#64748b', marginTop: 4 },
  vazio: { textAlign: 'center', color: '#94a3b8', marginTop: 40, fontSize: 16 },
});
