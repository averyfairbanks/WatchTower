import { Stack } from '@react-native-material/core';
import { ReactNode, createContext } from 'react';
import { Appbar, Text } from 'react-native-paper';
import { store } from '../../../store';
import { _isLoggedIn } from '../../utils/storeMethods';
import { useNavigate } from 'react-router-native';

export const AppBarContext = createContext(undefined);

export const AppBarProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const navigate = useNavigate();
    

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
                        <Appbar.Content
                            title={`Hello ${
                                store.getRawState().user.firstName
                            }!`}
                        />
                        <Appbar.Action icon="magnify" onPress={() => {}} />
                    </Appbar.Header>
                </Stack>
            ) : null}
            {children}
        </AppBarContext.Provider>
    );
};
