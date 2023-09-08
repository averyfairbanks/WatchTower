import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { NavigateFunction } from 'react-router-native';
import { SnackType } from '../common/SnackBar/types';
import { CreateMealDto } from './types';

export const _pickImage = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setImage: React.Dispatch<React.SetStateAction<Asset | undefined>>,
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
        setImage(file.assets[0]);
      }
      setIsLoading(false);
    })
    .catch(err => {
      console.log(err);
      addSnack('Error collecting your file!', SnackType.FAILURE);
    });
};

// handler for submitting new photo/meal
export const handleLogMeal = async (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  image: Asset | undefined,
  userId: string,
  createDto: Omit<CreateMealDto, 'photoUrl'>,
  navigate: NavigateFunction,
  addSnack: (message: string, type: SnackType) => null,
) => {
  setIsLoading(true);
  try {
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
      const putImage = await fetch(signedUrl.toString(), {
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

      // finally, if file upload successful, submit complete meal details to db
      await fetch(`http://localhost:3000/meal/create`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          ...createDto,
          photoUrl: `${userId}/meals/${filename}`,
        }),
      })
        .then(async res => {
          if (res.ok) {
            return res.json();
          }

          const body = await res.json();
          throw new Error(`${body.statusCode}, ${body.statusText}`);
        })
        .then(userMeal => {
          // userMeal should contain the newly created UserMeal object
          console.log(userMeal);
          setIsLoading(false);
          navigate(-1);
        });
    } else {
      addSnack(
        'Cannot submit with a picture! Take your best shot ;)',
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
