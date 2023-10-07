// App.tsx
import React from 'react';

import store, { RootState } from './store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import RenderRoutes from './routes';
import Menu from './components/Menu/Menu';
import { useSelector } from 'react-redux';

const App: React.FC = () => {
  // Aquí puedes agregar la lógica para determinar si el usuario está logueado o no
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const menuItems = [
    { label: 'Opción 1', action: () => console.log('option 1') },
    { label: 'Opción 2', action: () => console.log('option 2')  },
    // ... more items
  ];

  return (
    <Router>
      {isAuthenticated && <Menu mainIcon="your-main-icon" menuItems={menuItems} />}
      {RenderRoutes()}
    </Router>
  );
};

export default App;
