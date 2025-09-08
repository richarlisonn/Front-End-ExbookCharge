import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import './styles/LoginPage.css';
import Icon from "../assets/images/icon.png";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email) newErrors.email = 'campo obrigatório*';
    if (!password) newErrors.password = 'campo obrigatório*';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log('Login realizado:', { email, password });
  };

  return (
    <div className="login-container">
      <img src={Icon} alt="Logo" className="logo_LoginPage" />

      <form onSubmit={handleLogin} className="form">
        <h2>LOGIN</h2>

        <label htmlFor="email">EMAIL</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="erro">{errors.email}</span>}

        <label htmlFor="password">SENHA</label>
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>
        {errors.password && <span className="erro">{errors.password}</span>}

        <button type="submit" className="btn-acessar">ACESSAR</button>
      </form>

      <Link to="/esqueci-senha" className="link-ajuda">Esqueceu a Senha?</Link>
    </div>
  );
}

export default LoginPage;
