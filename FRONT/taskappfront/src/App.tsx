// App.tsx
import React from 'react';

import store from './store/store';
import renderRoutes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

const App: React.FC = () => {
  // Aquí puedes agregar la lógica para determinar si el usuario está logueado o no
  const isAuthenticated = store.getState().user.isAuthenticated;
  return (
    <Router>{renderRoutes(isAuthenticated)}</Router>
  );
};

export default App;
