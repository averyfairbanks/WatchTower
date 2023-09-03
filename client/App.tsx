import { NativeRouter, Route, Routes, Navigate } from 'react-router-native';
import { LoginPage } from './src/Login/LoginPage';
import { _isDarkMode, _isLoggedIn } from './src/utils/storeMethods';
import { Home } from './src/Home/Home';
import { SnackBarProvider } from './src/common/SnackBar/SnackBarProvider';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Meal } from './src/Meal/Meal';

const App = (): JSX.Element => {
    const theme = _isDarkMode() ? MD3DarkTheme : MD3LightTheme;

    return (
        <NativeRouter>
            <PaperProvider theme={theme}>
                <SnackBarProvider>
                    <Routes>
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
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/meal/:id" element={<Meal />} />
                    </Routes>
                </SnackBarProvider>
            </PaperProvider>
        </NativeRouter>
    );
};

export default App;
