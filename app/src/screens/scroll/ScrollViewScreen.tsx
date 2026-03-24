import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import scrollStyles from '../../styles/scrollStyles';
import theme from '../../styles/theme';
import { scrollViewData } from '../../utils/data';

export function ScrollViewScreen() {
  const color = theme.colors.scrollView;

  return (
    <View style={scrollStyles.container}>
      <View style={scrollStyles.header}>
        <Text style={[scrollStyles.headerTitle, { color }]}>ScrollView</Text>
        <Text style={scrollStyles.headerSubtitle}>
          Componente que renderiza todo o conteudo de uma vez, ideal para listas pequenas.
        </Text>
      </View>

      <ScrollView contentContainerStyle={scrollStyles.scrollContent}>
        {scrollViewData.map((item) => (
          <View key={item.id} style={scrollStyles.card}>
            <Text style={[scrollStyles.cardIndex, { color }]}>#{item.id}</Text>
            <Text style={scrollStyles.cardTitle}>{item.title}</Text>
            <Text style={scrollStyles.cardBody}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
