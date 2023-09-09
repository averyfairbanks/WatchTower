import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { ReactNode } from 'react';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { NativeRouter, Routes } from 'react-router-native';
import { _isDarkMode } from '../utils/storeMethods';
import { AppBarProvider } from './AppBar/AppBarProvider';
import { SnackBarProvider } from './SnackBar/SnackBarProvider';
import { WebSocketLink } from '@apollo/link-ws';

export const Providers: React.FC<{ children: ReactNode[] }> = ({
  children,
}) => {
  const theme = _isDarkMode() ? MD3DarkTheme : MD3LightTheme;

  const wsLink = new WebSocketLink({
    uri: `ws://localhost:3000/graphql`,
    options: {
      reconnect: true,
    },
  });

  const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql',
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    link,
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
