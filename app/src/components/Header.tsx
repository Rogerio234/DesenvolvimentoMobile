import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../styles/theme';

interface HeaderProps {
  title: string;
  subtitle?: string;
  color?: string;
}

export function Header({ title, subtitle, color = theme.colors.primary }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color }]}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.l,
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  title: {
    fontSize: theme.fontSize.title,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});
