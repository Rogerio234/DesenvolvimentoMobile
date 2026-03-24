import { StyleSheet } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    padding: theme.spacing.l,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: theme.fontSize.title,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: theme.fontSize.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  scrollContent: {
    padding: theme.spacing.m,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.m,
    padding: theme.spacing.l,
    marginBottom: theme.spacing.m,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardTitle: {
    fontSize: theme.fontSize.subtitle,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  cardBody: {
    fontSize: theme.fontSize.body,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  cardIndex: {
    fontSize: theme.fontSize.small,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  separator: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.s,
  },
  sectionHeader: {
    fontSize: theme.fontSize.subtitle,
    fontWeight: 'bold',
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    marginTop: theme.spacing.s,
    borderRadius: theme.borderRadius.s,
  },
  sectionItem: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    marginHorizontal: theme.spacing.m,
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sectionItemText: {
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
  },
});
