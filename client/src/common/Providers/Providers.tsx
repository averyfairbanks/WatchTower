import { ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { NativeRouter, Routes } from 'react-router-native';
import { AppBarProvider } from '../AppBar/AppBarProvider';
import { SnackBarProvider } from '../SnackBar/SnackBarProvider';
import { setupApolloClient } from './apolloClient';

export const ProvidersWrapper: React.FC<{ children: ReactNode[] }> = ({
  children,
}) => {
  const theme = useColorScheme() === 'dark' ? MD3DarkTheme : MD3LightTheme;

  const apolloClient = setupApolloClient();

  return (
    <ApolloProvider client={apolloClient}>
      <PaperProvider theme={theme}>
        <NativeRouter>
          <SnackBarProvider>
            <AppBarProvider>
              <Routes>{children}</Routes>
            </AppBarProvider>
          </SnackBarProvider>
        </NativeRouter>
      </PaperProvider>
    </ApolloProvider>
  );
};
