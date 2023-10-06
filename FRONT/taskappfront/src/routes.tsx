// routes.tsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
import { login } from './services/authService';
import { stateLogin } from './store/userSlice';

const RenderRoutes = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserIfTokenExists = async () => {
      const userDataString = localStorage.getItem('userData');
      console.log(userDataString)
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        try {
          const loggedInUser = await login(userData.username, userData.password);
          dispatch(stateLogin({
            id: loggedInUser.user.id,
            name: loggedInUser.user.name,
            password: loggedInUser.user.password,
            role: loggedInUser.user.role
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
      {/* Otras rutas aquí */}
    </Routes>
  );

  const loadingResponse = () => (
    <>
      <p>Cargando...</p>
    </>
  );

  return (
    (isLoading ? loadingResponse() : routesResponse())
  );
};

export default RenderRoutes;
