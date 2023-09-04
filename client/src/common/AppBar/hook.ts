import { useContext } from 'react';
import { AppBarContext } from './AppBarProvider';

export const useAppbarContext = () => {
    return useContext(AppBarContext);
};
