import { useContext } from 'react';
import { SnackBarContext } from './SnackBarProvider';

export const useSnackBar = () => {
    return useContext(SnackBarContext);
};
