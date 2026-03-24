import { StyleSheet } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  logo: {
    fontSize: 64,
    marginBottom: theme.spacing.l,
  },
  title: {
    fontSize: theme.fontSize.header,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.m,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.fontSize.subtitle,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: theme.spacing.xl,
    paddingHorizontal: theme.spacing.m,
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.l,
    width: '100%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: theme.fontSize.body,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  infoBullet: {
    fontSize: theme.fontSize.body,
    color: theme.colors.primary,
    marginRight: theme.spacing.s,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: theme.fontSize.body,
    color: theme.colors.textSecondary,
    flex: 1,
  },
});
