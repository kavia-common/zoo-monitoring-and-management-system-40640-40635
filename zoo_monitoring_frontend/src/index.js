import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/theme.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Toaster } from './components/ui/States';
import OfflineBanner from './components/OfflineBanner';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Global offline indicator */}
    <OfflineBanner />
    {/* Router */}
    <RouterProvider router={router} />
    {/* Global toaster */}
    <Toaster />
  </React.StrictMode>
);
