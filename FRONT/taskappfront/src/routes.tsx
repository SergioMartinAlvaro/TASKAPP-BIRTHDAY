// routes.tsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { login } from './services/authService';
import { stateLogin } from './store/userSlice';
import Classification from './features/user/pages/Classification/Classification';
import userImage from './assets/images/peeps/loading.svg';
import Loading from './components/Loading/Loading';

const RenderRoutes = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserIfTokenExists = async () => {
      const userDataString = localStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        try {
          const loggedInUser = await login(userData.username, userData.password);
          dispatch(stateLogin({
            id: loggedInUser.user.id,
            name: loggedInUser.user.name,
            password: loggedInUser.user.password,
            role: loggedInUser.user.role,
            dataAllTasksCompleted: loggedInUser.user.dataAllTasksCompleted ? loggedInUser.user.dataAllTasksCompleted : null 
          }));
        } catch (error) {
          // Manejar el error, por ejemplo, redirigir a la página de inicio de sesión
          console.error('Error al iniciar sesión:', error);
        }
        finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    getUserIfTokenExists();
  }, [dispatch]);

  const routesResponse = () => (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/classification"
        element={isAuthenticated ? <Classification /> : <Navigate to="/login" />}
      />
      {/* Otras rutas aquí */}
    </Routes>
  );

  const loadingResponse = () => (
    <div style={{marginTop: "140px"}}>
      <Loading text="Estamos cargando tu usuario..." image={userImage} />
    </div>
  );

  return (
    (isLoading ? loadingResponse() : routesResponse())
  );
};

export default RenderRoutes;
