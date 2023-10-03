import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form, { IFieldConfig } from './components/Form/Form';
import Title, { ETitleSize } from './components/Title/Title';
import Tooltip from './components/Tooltip/Tooltip';
import ProgressBar from './components/ProgressBar/ProgressBar';
import Alert, { AlertType } from './components/Alert/Alert';
import AdminList from './features/admin/components/AdminList/AdminList';
import {ReactComponent as ModificarIcon} from './assets/icons/Modificar.svg';
import {ReactComponent as EliminarIcon} from './assets/icons/Eliminar.svg'

const fieldsConfig: IFieldConfig[] = [
  { type: 'input', name: 'name', placeholder: 'Nombre'},
  { type: 'password', name: 'password', placeholder: 'Contraseña' },
  { type: 'select', label: 'Color Favorito', options: ['Rojo', 'Azul', 'Verde'], name: 'favoriteColor' },
  { type: 'textarea', label: 'Comentarios', name: 'comments' },
];

const itemList = [
  {
    text: 'Elemento 1',
    icons: {
      Modificar: { icon: <ModificarIcon />, action: () => alert('Modificar acción') },
      Eliminar: { icon: <EliminarIcon />, action: () => alert('Eliminar acción') },
    },
  },
  {
    text: 'Elemento 2',
    icons: {
      Modificar: { icon: <ModificarIcon />, action: () => alert('Modificar acción') },
      Eliminar: { icon: <EliminarIcon />, action: () => alert('Eliminar acción') },
    },
  },
  // Agrega más elementos según sea necesario
];

const App = () => {
  return (
    <div className="App">
    <Title text="Escape App" size={ETitleSize.Large}></Title>
    <Form fields={fieldsConfig} />
    <Tooltip position='right' type="secondary">
      <p>My name is Sergio</p>
    </Tooltip>
    <ProgressBar progress={50}></ProgressBar>
    <Alert message='Tarea completada con éxito' type={AlertType.Success}></Alert>
    <AdminList items={itemList} />
  </div>
  );
}

export default App;

/*  {/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */