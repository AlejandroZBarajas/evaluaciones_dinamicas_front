
import React from 'react';
import './auth.css';

const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = "https://api.com/auth/google"; 
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Iniciar Sesión</h1>
        <p className="login-subtitle">Autentícate con tu cuenta institucional</p>
        <button className="login-button" onClick={handleLogin}>
          Continuar con Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

