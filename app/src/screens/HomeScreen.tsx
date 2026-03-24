import React from 'react';
import { View, Text } from 'react-native';
import homeStyles from '../styles/homeStyles';

export function HomeScreen() {
  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.logo}>📱</Text>
      <Text style={homeStyles.title}>Bem-vindo ao Aplicativo</Text>
      <Text style={homeStyles.subtitle}>
        Utilize o menu de navegacao para acessar as telas de modais e as listas com rolagem.
      </Text>

      <View style={homeStyles.infoCard}>
        <Text style={homeStyles.infoTitle}>Como navegar:</Text>

        <View style={homeStyles.infoItem}>
          <Text style={homeStyles.infoBullet}>→</Text>
          <Text style={homeStyles.infoText}>Modais - Demonstracoes de Modal Slide, Fade e None</Text>
        </View>

        <View style={homeStyles.infoItem}>
          <Text style={homeStyles.infoBullet}>→</Text>
          <Text style={homeStyles.infoText}>Scrolls - Exemplos de ScrollView, FlatList e SectionList</Text>
        </View>
      </View>
    </View>
  );
}
