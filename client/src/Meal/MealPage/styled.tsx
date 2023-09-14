import { Avatar, IconButton } from 'react-native-paper';
import styled from 'styled-components';

export const StyledFoodIcon = styled(Avatar.Icon)`
  position: absolute;
  top: 15px;
  left: 15px;
  z-index: 1000;
`;

export const StyledDeleteIcon = styled(IconButton).attrs({
  mode: 'contained',
  size: 40,
})`
  position: absolute;
  bottom: 10px;
  align-self: center;
`;
