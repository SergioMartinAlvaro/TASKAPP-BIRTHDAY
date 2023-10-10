// App.tsx
import React, { useState } from 'react';

import store, { RootState } from './store/store';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import RenderRoutes from './routes';
import Menu from './components/Menu/Menu';
import { useDispatch, useSelector } from 'react-redux';
import Alert, { AlertType } from './components/Alert/Alert';
import { logout, setIsAdmin } from './store/userSlice';
import { cleanTasks } from './store/tasksSlice';
import { cleanKey } from './store/keysSlice';

const App: React.FC = () => {
  // Aquí puedes agregar la lógica para determinar si el usuario está logueado o no
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const [message, setMessage] = useState<string>('');
  const dispatch = useDispatch();

  const closeSession = () => {
    dispatch(logout());
    dispatch(cleanTasks());
    dispatch(cleanKey())
    dispatch(setIsAdmin(false))
    setMessage('Sesión cerrada con éxito');
    setTimeout(() => {
      setMessage('')
    }, 4000)
  }

  const menuItems = [
    { label: 'Modo Diablo', action: () => console.log('option 1') },
    { label: 'Cerrar Sesión', action: () => closeSession()  },
    // ... more items
  ];

  const adminMenuItems = [
    { label: 'Cerrar Sesión', action: () => closeSession()  },
  ]

  return (
    <Router>
      {isAuthenticated && <Menu mainIcon="your-main-icon" menuItems={!isAdmin  ? menuItems : adminMenuItems} />}
      {message && <Alert type={AlertType.Success} message={message} />}
      {RenderRoutes()}
    </Router>
  );
};

export default App;
