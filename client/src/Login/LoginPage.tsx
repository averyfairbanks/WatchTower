import { gql, useQuery } from '@apollo/client';
import { Box, VStack as Stack } from '@react-native-material/core';
import { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { store } from '../../store';
import { WatchTowerIcon } from '../common/Icons/WatchTowerIcon';
import { Loading } from '../common/Loading/Loading';
import { useSnackBar } from '../common/SnackBar/hook';
import { SnackType } from '../common/SnackBar/types';
import { _getUserDetails } from '../utils/storeMethods';

const USER_QUERY = gql`
  query ($id: String!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`;

export const LoginPage: React.FC = () => {
  const { id } = _getUserDetails();
  const { data, loading } = useQuery(USER_QUERY, { variables: { id } });

  const navigate = useNavigate();
  const { addSnack } = useSnackBar();

  if (loading) {
    return <Loading />;
  }

  const { user } = data;
  const {firstName, lastName} = user;

  const handleLogin = () => {
    if (firstName && lastName) {
      store.update(s => {
        s.user.firstName = firstName;
        s.user.lastName = lastName;
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
          value={firstName}
         
        />
        <TextInput
          label="Last Name"
          value={lastName}
        />
      </Stack>
      <Button mode="elevated" onPress={handleLogin}>
        Log In
      </Button>
    </Stack>
  );
};
