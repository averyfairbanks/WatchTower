import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
  OperationVariables,
} from '@apollo/client';
import notifee, {
  AndroidNotificationSetting,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import { FormikErrors } from 'formik';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { NavigateFunction } from 'react-router-native';
import { mixed, object, string } from 'yup';
import { SnackType } from '../../common/SnackBar/types';
import { encode } from '../../utils/encoding';
import { UserMeal } from '../types';
import { CreateMealDto, LogMealFormValues } from './types';

export const validationSchema = object().shape({
  userId: string().required(),
  name: string().required(),
  description: string().required(),
  image: mixed<Asset>().required(),
});

export const _pickImage = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setImage: (
    field: 'image',
    value: Asset,
  ) => Promise<void | FormikErrors<unknown>>,
  addSnack: (message: string, type: SnackType) => null,
) => {
  setIsLoading(true);
  launchImageLibrary({
    mediaType: 'photo',
    quality: 0.6,
    selectionLimit: 1,
  })
    .then(file => {
      if (!file.didCancel && file && file.assets && file.assets[0]) {
        setImage('image', file.assets[0]);
      }
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err);
      addSnack('Error collecting your file!', SnackType.FAILURE);
    });
};

const setupReminderNotification = async (mealName: string, mealId: number) => {
  await notifee.requestPermission();

  const settings = await notifee.getNotificationSettings();
  if (settings.android.alarm == AndroidNotificationSetting.ENABLED) {
  } else {
    await notifee.openAlarmPermissionSettings();
  }

  const channelId = await notifee.createChannel({
    id: 'watchtower-reminder',
    name: 'watchtower-reminder Channel',
  });

  const date = new Date(Date.now());
  date.setHours(date.getHours() + 1);

  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(),
  };

  await notifee.createTriggerNotification(
    {
      title: mealName,
      body: 'Please check in about your recent meal!',
      android: {
        channelId,
        smallIcon: undefined,
        pressAction: {
          id: 'watchtower-reminder',
          mainComponent: 'App',
        },
      },
      data: {
        mealId: encode(String(mealId)),
      },
    },
    trigger,
  );
};

// handler for submitting new photo/meal
export const handleLogMeal = async (
  logMeal: (
    options?: MutationFunctionOptions<
      any,
      OperationVariables,
      DefaultContext,
      ApolloCache<any>
    >,
  ) => Promise<FetchResult<UserMeal>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  formValues: LogMealFormValues,
  navigate: NavigateFunction,
  addSnack: (message: string, type: SnackType) => null,
) => {
  setIsLoading(true);

  try {
    const { userId, name, description, image } = formValues;

    if (image?.uri && image?.type) {
      // if image exists, fetch image blob
      const { uri, type } = image;
      const blob = await fetch(uri).then(res => {
        return res.blob();
      });

      // if blob was successfully fetch, create presigned upload url
      if (!blob) {
        throw new Error('File blob was empty.');
      }

      const filename = `${Date.now()}_meal.${type?.replace('image/', '')}`;

      const signedUrl = await fetch(
        `http://localhost:3000/photo-upload/create`,
        {
          method: 'POST',
          headers: {
            Accept: '*/*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            type,
            filename,
          }),
        },
      ).then(async res => {
        if (res.ok) {
          return res.text();
        }

        const body = await res.json();
        throw new Error(`${body.statusCode}, ${body.statusText}`);
      });

      // if url generated successfully, upload file
      await fetch(signedUrl.toString(), {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': `${type}; charset=ascii`,
        },
        body: blob,
      }).then(res => {
        if (!res.ok) {
          console.log(res.status);
          throw new Error('Error uploading file');
        }
      });

      // build createDto
      const createDto: CreateMealDto = {
        userId,
        name,
        description,
        photoUrl: `${userId}/meals/${filename}`,
      };

      // finally, if file upload successful, submit complete meal details to db
      await logMeal({
        variables: {
          input: createDto,
        },
      })
        .then(async res => {
          if (res?.data) {
            return res.data;
          }
          throw new Error("Couldn't commit new meal");
        })
        .then(async userMeal => {
          // userMeal should contain the newly created UserMeal object
          await setupReminderNotification(name, userMeal.id);
          setIsLoading(false);
          navigate(-1);
        });
    } else {
      addSnack(
        'Cannot submit without a picture! Take your best shot ;)',
        SnackType.WARNING,
      );
      setIsLoading(false);
    }
  } catch (err) {
    console.log(err);
    setIsLoading(false);
    addSnack('Error logging new meal!', SnackType.FAILURE);
  }
};
