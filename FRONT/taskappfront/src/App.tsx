import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form, { IFieldConfig } from './components/Form/Form';
import Title, { ETitleSize } from './components/Title/Title';
import Tooltip from './components/Tooltip/Tooltip';

const fieldsConfig: IFieldConfig[] = [
  { type: 'input', name: 'name', placeholder: 'Nombre'},
  { type: 'password', name: 'password', placeholder: 'Contraseña' },
  { type: 'select', label: 'Color Favorito', options: ['Rojo', 'Azul', 'Verde'], name: 'favoriteColor' },
  { type: 'textarea', label: 'Comentarios', name: 'comments' },
];

const App = () => {
  return (
    <div className="App">
    <Title text="Escape App" size={ETitleSize.Large}></Title>
    <Form fields={fieldsConfig} />
    <Tooltip position='right' type="secondary">
      <p>My name is Sergio</p>
    </Tooltip>
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