import { Store } from 'pullstate';
import { useColorScheme } from 'react-native';

interface UIStore {
    loggedIn: boolean;
    user: {
        firstName: string;
        lastName: string;
        email: string;
    };
    preferences: {
        isDarkMode: boolean;
        allowNotifications: boolean;
    };
}

const initialStore: UIStore = {
    loggedIn: true,
    user: {
        firstName: 'Avery',
        lastName: 'Fairbanks',
        email: '',
    },
    preferences: {
        isDarkMode: useColorScheme() === 'dark',
        allowNotifications: false,
    },
};

export const store = new Store<UIStore>(initialStore);
