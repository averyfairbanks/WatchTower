import { useContext } from 'react';
import { AppBarContext } from './AppBarProvider';

export const useSearchbarContext = () => {
  return useContext(AppBarContext);
};
