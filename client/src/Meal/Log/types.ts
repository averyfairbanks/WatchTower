import { Asset } from 'react-native-image-picker';

export interface CreateMealDto {
  userId: string;
  name: string;
  description: string;
  photoUrl: string;
}

export type LogMealFormValues = Omit<CreateMealDto, 'photoUrl'> & {
  image?: Asset;
};
