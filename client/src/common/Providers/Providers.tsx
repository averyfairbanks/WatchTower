import { ApolloProvider } from '@apollo/client';
import { ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { NativeRouter, Routes } from 'react-router-native';
import { AppBarProvider } from '../AppBar/AppBarProvider';
import { SnackBarProvider } from '../SnackBar/SnackBarProvider';
import { setupApolloClient } from './apolloClient';
import { darkTheme, lightTheme } from './themes';

export const ProvidersWrapper: React.FC<{ children: ReactNode[] }> = ({
  children,
}) => {
  const theme = useColorScheme() === 'dark' ? darkTheme : lightTheme;

  const apolloClient = setupApolloClient();

  return (
    <PaperProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <NativeRouter>
          <SnackBarProvider>
            <AppBarProvider>
              <Routes>{children}</Routes>
            </AppBarProvider>
          </SnackBarProvider>
        </NativeRouter>
      </ApolloProvider>
    </PaperProvider>
  );
};
