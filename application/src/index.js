import React from 'react';
import { createRoot } from 'react-dom/client';
import Dashboard from './components/Dashboard';
import { AppContextProvider } from './contexts/App';
import { ToastContextProvider } from './contexts/Toast';

import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <ToastContextProvider>
    <AppContextProvider>
      <Dashboard />
    </AppContextProvider>
  </ToastContextProvider>
);