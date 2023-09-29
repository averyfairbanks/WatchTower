import notifee from '@notifee/react-native';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-native';
import { Meals } from '../Meals/Meals';
import { Loading } from '../common/Loading/Loading';

export const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      return initialNotification.notification.data?.mealId.toString();
    }
  }

  useEffect(() => {
    bootstrap()
      .then(id => {
        setLoading(false);
        if (id) {
          navigate(`/meal/${id}`);
        }
      })
      .catch(console.error);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <Meals />;
};
