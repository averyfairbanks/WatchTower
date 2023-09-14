import { Button, Dialog, Text } from 'react-native-paper';

interface DialogProps {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
  confirmMealDelete: () => Promise<void>;
}

export const DeleteMealDialog: React.FC<DialogProps> = ({
  open,
  setOpen,
  confirmMealDelete,
}) => {
  return (
    <Dialog
      visible={open}
      dismissable={true}
      onDismiss={() => setOpen(false)}
      style={{ alignItems: 'center' }}>
      <Dialog.Icon icon="delete" />
      <Dialog.Title>Delete Meal</Dialog.Title>
      <Dialog.Content>
        <Text>Are you sure you want to delete this meal?</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={confirmMealDelete}>Yes</Button>
        <Button onPress={() => setOpen(false)}>Cancel</Button>
      </Dialog.Actions>
    </Dialog>
  );
};
