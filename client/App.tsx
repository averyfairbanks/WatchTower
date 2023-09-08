import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { NativeRouter, Navigate, Route, Routes } from 'react-router-native';
import { Home } from './src/Home/Home';
import { LoginPage } from './src/Login/LoginPage';
import { LogMeal } from './src/Meal/Log/LogMeal';
import { Meal } from './src/Meal/Meal';
import { AppBarProvider } from './src/common/AppBar/AppBarProvider';
import { SnackBarProvider } from './src/common/SnackBar/SnackBarProvider';
import { WTRoutes } from './src/routes';
import { _isDarkMode, _isLoggedIn } from './src/utils/storeMethods';

const App = (): JSX.Element => {
  const theme = _isDarkMode() ? MD3DarkTheme : MD3LightTheme;

  return (
    <NativeRouter>
      <PaperProvider theme={theme}>
        <SnackBarProvider>
          <AppBarProvider>
            <Routes>
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
            </Routes>
          </AppBarProvider>
        </SnackBarProvider>
      </PaperProvider>
    </NativeRouter>
  );
};

export default App;
