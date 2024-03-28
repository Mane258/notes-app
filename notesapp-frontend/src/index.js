import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'semantic-ui-css/semantic.min.css'

// rendering App component

const root = createRoot(document.getElementById('root'));
root.render(
  <App/>
)
