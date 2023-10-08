// App.tsx
import React, { useState } from 'react';

import store, { RootState } from './store/store';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import RenderRoutes from './routes';
import Menu from './components/Menu/Menu';
import { useDispatch, useSelector } from 'react-redux';
import Alert, { AlertType } from './components/Alert/Alert';
import { logout } from './store/userSlice';

const App: React.FC = () => {
  // Aquí puedes agregar la lógica para determinar si el usuario está logueado o no
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const [message, setMessage] = useState<string>('');
  const dispatch = useDispatch();

  const closeSession = () => {
    dispatch(logout());
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

  return (
    <Router>
      {isAuthenticated && <Menu mainIcon="your-main-icon" menuItems={menuItems} />}
      {message && <Alert type={AlertType.Success} message={message} />}
      {RenderRoutes()}
    </Router>
  );
};

export default App;
