import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ReactNode } from 'react';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { NativeRouter, Routes } from 'react-router-native';
import { _isDarkMode } from '../utils/storeMethods';
import { AppBarProvider } from './AppBar/AppBarProvider';
import { SnackBarProvider } from './SnackBar/SnackBarProvider';

export const Providers: React.FC<{ children: ReactNode[] }> = ({
  children,
}) => {
  const theme = _isDarkMode() ? MD3DarkTheme : MD3LightTheme;

  const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
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
