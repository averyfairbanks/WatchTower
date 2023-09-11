import { Stack } from '@react-native-material/core';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { Appbar, Searchbar, useTheme } from 'react-native-paper';
import { useLocation, useNavigate } from 'react-router-native';
import { _getUserDetails, _isLoggedIn } from '../../utils/storeMethods';

export const AppBarContext = createContext('');

export const AppBarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {colors} = useTheme();
  const navigate = useNavigate();

  const [state, setState] = useState({
    titleMessage: '',
    back: false,
    search: false,
    searchOpen: false,
  });

  const path = useLocation().pathname;

  useEffect(() => {
    if (path === '/home') {
      const { firstName } = _getUserDetails();
      setState({
        titleMessage: `Hello ${firstName}!`,
        back: false,
        search: true,
        searchOpen: false,
      });
    } else if (path === '/meal/create') {
      setState({
        titleMessage: 'Log New Meal',
        back: true,
        search: false,
        searchOpen: false,
      });
    } else {
      setState({
        titleMessage: '',
        back: true,
        search: false,
        searchOpen: false,
      });
    }
  }, [path]);

  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <AppBarContext.Provider value={searchTerm}>
      {_isLoggedIn() ? (
        <Stack>
          <Appbar.Header elevated={true}>
            {state.back && (
              <Appbar.BackAction
                onPress={() => {
                  setState({ ...state, searchOpen: false });
                  setSearchTerm('');
                  navigate(-1);
                }}
              />
            )}
            {!state.searchOpen && <Appbar.Content title={state.titleMessage} />}
            {state.search && !state.searchOpen && (
              <Appbar.Action
                icon="magnify"
                onPress={() => setState({ ...state, searchOpen: true })}
              />
            )}
            {state.searchOpen && (
              <Searchbar
                placeholder="Search"
                onChangeText={setSearchTerm}
                value={searchTerm}
              />
            )}
          </Appbar.Header>
        </Stack>
      ) : null}
      {children}
    </AppBarContext.Provider>
  );
};
