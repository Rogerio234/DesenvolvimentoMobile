import { StyleSheet } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.l,
  },
  headerText: {
    fontSize: theme.fontSize.title,
    fontWeight: '900',
    marginBottom: theme.spacing.l,
  },
  description: {
    fontSize: theme.fontSize.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    lineHeight: 24,
    paddingHorizontal: theme.spacing.m,
  },
  mainButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: theme.borderRadius.m,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: theme.colors.textLight,
    fontSize: theme.fontSize.body,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '85%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.l,
    padding: theme.spacing.l,
    alignItems: 'center',
    overflow: 'hidden',
  },
  colorIndicator: {
    width: '120%',
    height: 8,
    position: 'absolute',
    top: 0,
  },
  modalTitle: {
    fontSize: theme.fontSize.title,
    fontWeight: 'bold',
    marginTop: theme.spacing.m,
    marginBottom: theme.spacing.s,
    color: theme.colors.text,
  },
  modalBody: {
    fontSize: theme.fontSize.body,
    textAlign: 'center',
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.l,
    lineHeight: 24,
  },
  closeButton: {
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: theme.borderRadius.s,
  },
  closeButtonText: {
    color: theme.colors.textSecondary,
    fontWeight: 'bold',
    fontSize: theme.fontSize.body,
  },
});
