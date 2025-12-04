import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Auth/Login';
import AnimalsList from '../pages/Animals/AnimalsList';
import Dashboard from '../pages/Dashboard/Dashboard';
import Timeline from '../pages/Timeline/Timeline';
import Reports from '../pages/Reports/Reports';
import Chat from '../pages/Chat/Chat';
import NotFound from '../pages/NotFound';

// PUBLIC_INTERFACE
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'animals', element: <AnimalsList /> },
      { path: 'timeline', element: <Timeline /> },
      { path: 'reports', element: <Reports /> },
      { path: 'chat', element: <Chat /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '*', element: <NotFound /> },
]);

export default router;
