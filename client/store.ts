import { Store } from 'pullstate';
import { useColorScheme } from 'react-native';

interface UIStore {
  loggedIn: boolean;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  preferences: {
    allowNotifications: boolean;
  };
}

const initialStore: UIStore = {
  loggedIn: true,
  user: {
    id: 1,
    firstName: 'Alex',
    lastName: 'Fairbanks',
    email: '',
  },
  preferences: {
    allowNotifications: false,
  },
};

export const store = new Store<UIStore>(initialStore);
