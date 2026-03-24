import React from 'react';
import { SectionList, Text, View } from 'react-native';
import scrollStyles from '../../styles/scrollStyles';
import theme from '../../styles/theme';
import { sectionListData } from '../../utils/data';

export function SectionListScreen() {
  const color = theme.colors.sectionList;

  return (
    <View style={scrollStyles.container}>
      <View style={scrollStyles.header}>
        <Text style={[scrollStyles.headerTitle, { color }]}>SectionList</Text>
        <Text style={scrollStyles.headerSubtitle}>
          Componente que organiza os dados em secoes com cabecalhos, ideal para dados agrupados.
        </Text>
      </View>

      <SectionList
        sections={sectionListData}
        keyExtractor={(item, index) => item + index}
        contentContainerStyle={scrollStyles.scrollContent}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[scrollStyles.sectionHeader, { backgroundColor: color + '20', color }]}>
            {title}
          </Text>
        )}
        renderItem={({ item }) => (
          <View style={scrollStyles.sectionItem}>
            <Text style={scrollStyles.sectionItemText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
}
