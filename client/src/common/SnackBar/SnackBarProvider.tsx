import { ReactNode, createContext, useCallback, useState } from 'react';
import { Snack, SnackType } from './types';
import { SnackBarContainer } from './SnackBarContainer';
import { VStack } from '@react-native-material/core';

export const SnackBarContext = createContext({
  addSnack: (message: string, type: SnackType) => null,
  removeSnack: (id: number) => null,
  total: () => id,
});

let id = 0;
export const SnackBarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [snacks, setSnacks] = useState<Snack[]>([]);

  const addSnack = useCallback(
    (message: string, type: SnackType) => {
      setSnacks(snacks => {
        if (snacks.length < 3) {
          return [...snacks, { id: id++, message, type }];
        }
        return snacks;
      });
      return null;
    },
    [setSnacks],
  );

  const removeSnack = useCallback(
    (id: number) => {
      setSnacks(snacks => snacks.filter(s => s.id != id));
      return null;
    },
    [setSnacks],
  );

  const total = useCallback(() => snacks.length, [snacks.length]);

  return (
    <SnackBarContext.Provider value={{ addSnack, removeSnack, total }}>
      {children}
      <SnackBarContainer snacks={snacks} />
    </SnackBarContext.Provider>
  );
};
