import { Stack } from '@react-native-material/core';
import { ReactNode, createContext } from 'react';
import { Appbar, Text } from 'react-native-paper';
import { store } from '../../../store';
import { _getUserDetails, _isLoggedIn } from '../../utils/storeMethods';
import { useLocation, useNavigate } from 'react-router-native';

export const AppBarContext = createContext(undefined);

const determineAppbarText = (path: string) => {
    if (path === '/home') {
        const { firstName } = _getUserDetails();
        return `Hello ${firstName}!`;
    } else if (path === '/meal/create') {
        return 'Log New Meal';
    } else if (/\/meal\/\w/.test(path)) {
        return '';
    } 
};

export const AppBarProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const navigate = useNavigate();
    const currPath = useLocation().pathname;

    return (
        <AppBarContext.Provider value={undefined}>
            {store.getRawState().loggedIn ? (
                <Stack>
                    <Appbar.Header>
                        <Appbar.BackAction
                            onPress={() => {
                                navigate(-1);
                            }}
                        />
                        <Appbar.Content title={determineAppbarText(currPath)} />
                        <Appbar.Action icon="magnify" onPress={() => {}} />
                    </Appbar.Header>
                </Stack>
            ) : null}
            {children}
        </AppBarContext.Provider>
    );
};
