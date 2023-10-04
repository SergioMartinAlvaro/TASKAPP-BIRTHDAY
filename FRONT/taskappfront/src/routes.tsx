// routes.tsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

const renderRoutes = (isAuthenticated) => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route
      path="/"
      element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
    />
    {/* Otras rutas aquí */}
  </Routes>
);

export default renderRoutes;