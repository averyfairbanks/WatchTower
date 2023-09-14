import { Stack } from '@react-native-material/core';
import { ReactNode, createContext, useCallback, useEffect, useState } from 'react';
import { Appbar, Searchbar, useTheme } from 'react-native-paper';
import { useLocation, useNavigate } from 'react-router-native';
import { _getUserDetails, _isLoggedIn } from '../../utils/storeMethods';

interface AppbarState {
  titleMessage: string;
  back: boolean;
  search: boolean;
  searchOpen: boolean;
}

export const AppBarContext = createContext({
  searchTerm: '',
  updateAppbar: (newState: AppbarState) => null,
});

export const AppBarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { colors } = useTheme();

  const searchTheme = {
    colors: {
      primary: colors.onPrimary,
      onSurface: colors.surfaceVariant,
      onSurfaceVariant: colors.onPrimary,
      elevation: {
        level3: colors.primary,
      },
    },
  };

  const navigate = useNavigate();

  const [state, setState] = useState({
    titleMessage: '',
    back: false,
    search: false,
    searchOpen: false,
  });

  const updateAppbar = useCallback((newState: AppbarState) => {
    setState({...state, ...newState});
    return null;
  }, [setState])

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
  const { back, search, searchOpen, titleMessage } = state;

  return (
    <AppBarContext.Provider value={{searchTerm, updateAppbar}}>
      {_isLoggedIn() ? (
        <Stack>
          <Appbar.Header elevated={true}>
            {back && (
              <Appbar.BackAction
                onPress={() => {
                  setState({ ...state, searchOpen: false });
                  setSearchTerm('');
                  navigate(-1);
                }}
              />
            )}
            {!searchOpen && <Appbar.Content title={titleMessage} />}
            {search && !searchOpen && (
              <Appbar.Action
                icon="magnify"
                onPress={() => setState({ ...state, searchOpen: true })}
              />
            )}
            {searchOpen && (
              <Searchbar
                theme={searchTheme}
                returnKeyType="done"
                placeholder="Search"
                value={searchTerm}
                onChangeText={setSearchTerm}
                onClearIconPress={() =>
                  setState({ ...state, searchOpen: false })
                }
                onBlur={() => setState({ ...state, searchOpen: false })}
              />
            )}
          </Appbar.Header>
        </Stack>
      ) : null}
      {children}
    </AppBarContext.Provider>
  );
};
