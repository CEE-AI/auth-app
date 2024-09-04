import React from 'react';
import './App.css';
import { useAuth } from './components/AuthProvider';
import { Link } from 'react-router-dom';

export default function App() {
  const{authToken, handleLogin, handleLogout} = useAuth()

  return (
    <div className='flex flex-col' >
      <h1 className="font-bold text-2xl"> Authentication Demystified</h1>
      <Link to="/protected"> Protected Route </Link>
        {authToken ? 
        (<button onClick={handleLogout}>Logout</button>
        ):(
          <button onClick={handleLogin}>Login</button>
        )}
    </div>
        
  );
}


