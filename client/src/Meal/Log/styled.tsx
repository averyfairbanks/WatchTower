import { Button, Text, TextInput } from 'react-native-paper';
import styled from 'styled-components';

export const StyledText = styled(Text).attrs({ variant: 'titleLarge' })``;

export const StyledTextInput = styled(TextInput).attrs({
  mode: 'outlined',
  multiline: true,
  numberOfLines: 15,
  maxLength: 512,
})``;

export const StyledSubmit = styled(Button).attrs({ mode: 'contained' })`
  position: absolute;
  start: 7px;
  end: 7px;
  bottom: 0px;
`;
