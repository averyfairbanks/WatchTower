import { Navigate, Route } from 'react-router-native';
import { Home } from './src/Home/Home';
import { LoginPage } from './src/Login/LoginPage';
import { LogMeal } from './src/Meal/Log/LogMeal';
import { Meal } from './src/Meal/MealPage/Meal';
import { ProvidersWrapper } from './src/common/Providers/Providers';
import { WTRoutes } from './src/routes';
import { _isLoggedIn } from './src/utils/storeMethods';

const App = (): JSX.Element => {
  return (
    <ProvidersWrapper>
      <Route
        path={WTRoutes.Entry}
        element={
          _isLoggedIn() ? (
            <Navigate to={WTRoutes.Home} replace />
          ) : (
            <Navigate to={WTRoutes.Login} replace />
          )
        }
      />
      <Route path={WTRoutes.Login} element={<LoginPage />} />
      <Route path={WTRoutes.Home} element={<Home />} />
      <Route path={WTRoutes.Meal} element={<Meal />} />
      <Route path={WTRoutes.LogMeal} element={<LogMeal />} />
    </ProvidersWrapper>
  );
};

export default App;
