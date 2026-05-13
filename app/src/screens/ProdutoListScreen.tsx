import React, { useCallback, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, ActivityIndicator,
  RefreshControl, TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';
import FeedbackModal from '../components/FeedbackModal';

export default function ProdutoListScreen({ navigation }: any) {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [modal, setModal] = useState({ visivel: false, tipo: '' as any, mensagem: '' });

  const abrirModal = (tipo: any, mensagem: string) => setModal({ visivel: true, tipo, mensagem });
  const fecharModal = () => setModal({ visivel: false, tipo: '', mensagem: '' });

  const carregar = async () => {
    try {
      setLoading(true);
      const resp = await api.get('/api/produtos');
      setProdutos(resp.data);
    } catch {
      abrirModal('erro', 'Nao foi possivel carregar os produtos.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => { setRefreshing(true); await carregar(); setRefreshing(false); };

  useFocusEffect(useCallback(() => { carregar(); }, []));

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#2563eb" /><Text>Carregando...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Produtos ({produtos.length})</Text>
        <TouchableOpacity style={styles.botaoNovo} onPress={() => navigation.navigate('ProdutoForm')}>
          <Text style={styles.botaoNovoTexto}>+ Novo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={produtos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProdutoDetail', { id: item.id })}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.info}>Qtd: {item.quantidade} | R$ {item.valor?.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhum produto cadastrado.</Text>}
      />

      <FeedbackModal visivel={modal.visivel} tipo={modal.tipo} mensagem={modal.mensagem} onFechar={fecharModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  titulo: { fontSize: 24, fontWeight: '800', color: '#0f172a' },
  botaoNovo: { backgroundColor: '#2563eb', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  botaoNovoTexto: { color: '#fff', fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, elevation: 2 },
  nome: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  info: { fontSize: 14, color: '#64748b', marginTop: 4 },
  vazio: { textAlign: 'center', color: '#94a3b8', marginTop: 40, fontSize: 16 },
});
