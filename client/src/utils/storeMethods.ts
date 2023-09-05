import { store } from '../../store';
import { encode } from './encoding';

export const _isDarkMode = (): boolean => {
  return store.getRawState().preferences.isDarkMode;
};

export const _isLoggedIn = (): boolean => {
  return store.getRawState().loggedIn;
};

export const _login = () => {
  store.getRawState();
};

export const _getUserDetails = () => {
  const { user } = store.getRawState();
  const { id, firstName, lastName } = user;
  return { id: encode(id), firstName, lastName };
};
