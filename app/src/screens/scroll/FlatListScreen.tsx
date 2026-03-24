import React from 'react';
import { FlatList, Text, View } from 'react-native';
import scrollStyles from '../../styles/scrollStyles';
import theme from '../../styles/theme';
import { flatListData } from '../../utils/data';

export function FlatListScreen() {
  const color = theme.colors.flatList;

  return (
    <View style={scrollStyles.container}>
      <View style={scrollStyles.header}>
        <Text style={[scrollStyles.headerTitle, { color }]}>FlatList</Text>
        <Text style={scrollStyles.headerSubtitle}>
          Componente otimizado que renderiza apenas os itens visiveis na tela, ideal para listas grandes.
        </Text>
      </View>

      <FlatList
        data={flatListData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={scrollStyles.scrollContent}
        ItemSeparatorComponent={() => <View style={scrollStyles.separator} />}
        renderItem={({ item }) => (
          <View style={scrollStyles.card}>
            <Text style={[scrollStyles.cardIndex, { color }]}>#{item.id}</Text>
            <Text style={scrollStyles.cardTitle}>{item.nome}</Text>
            <Text style={scrollStyles.cardBody}>{item.curso}</Text>
          </View>
        )}
      />
    </View>
  );
}
