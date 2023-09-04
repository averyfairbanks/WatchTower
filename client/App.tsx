import { NativeRouter, Route, Routes, Navigate } from 'react-router-native';
import { LoginPage } from './src/Login/LoginPage';
import { _isDarkMode, _isLoggedIn } from './src/utils/storeMethods';
import { Home } from './src/Home/Home';
import { SnackBarProvider } from './src/common/SnackBar/SnackBarProvider';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Meal } from './src/Meal/Meal';
import { AppBarProvider } from './src/common/AppBar/AppBarProvider';
import { LogMeal } from './src/Meal/LogMeal';

const App = (): JSX.Element => {
    const theme = _isDarkMode() ? MD3DarkTheme : MD3LightTheme;

    return (
        <NativeRouter>
            <PaperProvider theme={theme}>
                <SnackBarProvider>
                    <AppBarProvider>
                        <Routes>
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/"
                                element={
                                    _isLoggedIn() ? (
                                        <Navigate to="/home" replace />
                                    ) : (
                                        <LoginPage />
                                    )
                                }
                            />
                            <Route path="/home" element={<Home />} />
                            <Route path="/meal/:id" element={<Meal />} />
                            <Route path="/meal/create" element={<LogMeal />} />
                        </Routes>
                    </AppBarProvider>
                </SnackBarProvider>
            </PaperProvider>
        </NativeRouter>
    );
};

export default App;
