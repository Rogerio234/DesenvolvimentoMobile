import { ReactNode } from 'react';
import { View } from 'react-native';
import globalStyles from '../styles/globalStyles';

interface ScreenContainerProps {
  children: ReactNode;
}

export function ScreenContainer({ children }: ScreenContainerProps) {
  return (
    <View style={globalStyles.centeredContainer}>
      {children}
    </View>
  );
}
