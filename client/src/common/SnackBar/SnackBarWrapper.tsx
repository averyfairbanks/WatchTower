import { useEffect } from 'react';
import { useSnackBar } from './hook';
import { Snack, SnackType } from './types';
import { MD3Colors, Snackbar, Text } from 'react-native-paper';

const determineSnackColor = (type: SnackType) => {
  switch (type) {
    case SnackType.SUCCESS:
      return MD3Colors.secondary30;
    case SnackType.FAILURE:
      return MD3Colors.error40;
    case SnackType.WARNING:
      return MD3Colors.error10;
  }
};

export const SnackBarWrapper: React.FC<{ snack: Snack }> = ({ snack }) => {
  const { id, message, type } = snack;
  const { removeSnack, total } = useSnackBar();

  const timeout = Math.min(3500 * total(), 6500);

  return (
    <Snackbar
      visible={true}
      duration={timeout}
      onDismiss={() => removeSnack(id)}
      action={{
        label: 'Dismiss',
        textColor: determineSnackColor(type),
      }}
      style={{
        position: 'absolute',
        start: 16,
        end: 16,
        bottom: 16,
      }}>
      <Text style={{ color: MD3Colors.secondary10 }}>{message}</Text>
    </Snackbar>
  );
};
