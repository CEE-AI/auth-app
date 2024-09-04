import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { AuthProvider } from './components/AuthProvider.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/protected',
    element: (
    <ProtectedRoute allowedRoles={['admin']}>
      <div>protected content</div>
    </ProtectedRoute>
      
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
