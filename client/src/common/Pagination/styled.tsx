import { FAB, Surface } from 'react-native-paper';
import styled from 'styled-components';

export const BottomBar = styled(Surface)`
  position: absolute;
  height: 80px;
  bottom: 0px;
  right: 0px;
  left: 0px;
`;

export const LogMealButton = styled(FAB).attrs({
  icon: 'plus',
  variant: 'surface',
})`
  position: absolute;
  align-self: center;
  bottom: 10px;
`;

export const PaginatorArrow = styled(FAB).attrs({ variant: 'surface' })`
  position: absolute;
  bottom: 10px;
  border-radius: 30px;
`;
