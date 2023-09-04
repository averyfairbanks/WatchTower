import { store } from '../../store';

export const _isDarkMode = (): boolean => {
    return store.getRawState().preferences.isDarkMode;
};

export const _isLoggedIn = (): boolean => {
    return store.getRawState().loggedIn;
};

export const _login = () => {
    store.getRawState();
};

export const _getUserId = () => {
    return btoa(String(store.getRawState().user.id));
};
