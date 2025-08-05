import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/LoginPage.css';
import Icon from "../assets/images/icon.png";



function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email) newErrors.email = 'campo obrigatório*';
    if (!senha) newErrors.senha = 'campo obrigatório*';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    
    console.log('Login realizado:', { email, senha });
  };

  return (
    <div className="login-container">
      <img src={Icon} alt="Logo" className="logo" />

      <form onSubmit={handleLogin} className="form">
        <h2>LOGIN</h2>

        <label htmlFor="email">EMAIL</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="erro">{errors.email}</span>}

        <label htmlFor="senha">SENHA</label>
        <div className="senha-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <span className="toggle" onClick={() => setShowPassword(!showPassword)}>
            👁️
          </span>
        </div>
        {errors.senha && <span className="erro">{errors.senha}</span>}

        <button type="submit" className="btn-acessar">ACESSAR</button>
      </form>

      <Link to="/esqueci-senha" className="link-ajuda">Esqueceu a Senha?</Link>
    </div>
  );
}

export default LoginPage;