import { Box, VStack as Stack } from '@react-native-material/core';
import { TextInput, Button } from 'react-native-paper';
import { useState } from 'react';
import { WatchTowerIcon } from '../common/Icons/WatchTowerIcon';
import { store } from '../../store';
import { useNavigate } from 'react-router-native';
import { useSnackBar } from '../common/SnackBar/hook';
import { SnackType } from '../common/SnackBar/types';

export const LoginPage: React.FC = () => {
  const [fName, setFName] = useState<string>('');
  const [lName, setLName] = useState<string>('');
  const navigate = useNavigate();
  const { addSnack } = useSnackBar();

  const handleLogin = () => {
    if (fName && lName) {
      store.update(s => {
        s.user.firstName = fName;
        s.user.lastName = lName;
        s.loggedIn = true;
        navigate('/home');
      });
    } else {
      addSnack("You're missing login details!", SnackType.WARNING);
    }
  };

  return (
    <Stack fill center spacing={40}>
      <Box>
        <WatchTowerIcon size={200} />
      </Box>
      <Stack w={300} spacing={10}>
        <TextInput
          label="First Name"
          value={fName}
          onChange={e => setFName(e.nativeEvent.text)}
          error={fName.length === 0}
        />
        <TextInput
          label="Last Name"
          value={lName}
          onChange={e => setLName(e.nativeEvent.text)}
          error={fName.length === 0}
        />
      </Stack>
      <Button mode="elevated" onPress={handleLogin}>
        Log In
      </Button>
    </Stack>
  );
};
