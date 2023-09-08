import { VStack } from '@react-native-material/core';
import { Formik } from 'formik';
import { _getUserDetails } from '../../utils/storeMethods';
import { InnerForm } from './InnerForm';
import { LogMealFormValues } from './types';
import { validationSchema } from './utils';

export const LogMeal: React.FC = () => {
  const { id: userId } = _getUserDetails();

  const initialValues: LogMealFormValues = {
    userId,
    name: '',
    description: '',
    image: undefined,
  };

  return (
    <VStack fill spacing={20} m={7} mt={20}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={console.log}>
        {() => <InnerForm />}
      </Formik>
    </VStack>
  );
};
