import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from "../assets/images/icon.png";
import './styles/RegisterPage.css';

function RegisterPage() {
  const [form, setForm] = useState({
    email: '',
    nascimento: '',
    telefone: '',
    senha: '',
    confirmarSenha: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.email) newErrors.email = 'campo obrigatório*';
    if (!form.nascimento) newErrors.nascimento = 'campo obrigatório*';
    if (!form.telefone) newErrors.telefone = 'campo obrigatório*';
    if (!form.senha) newErrors.senha = 'campo obrigatório*';
    if (!form.confirmarSenha) newErrors.confirmarSenha = 'campo obrigatório*';
    if (form.senha && form.confirmarSenha && form.senha !== form.confirmarSenha) {
      newErrors.confirmarSenha = 'as senhas não coincidem*';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Registro enviado com sucesso:', form);
      // aqui você pode integrar com API
    }
  };

  return (
    <div className="register-container">
      <img src={Icon} alt="Logo" className="logo" />

      <form className="form" onSubmit={handleSubmit}>
        <h2>REGISTRO</h2>

        <label>EMAIL</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="erro">{errors.email}</span>}

        <label>DATA NASCIMENTO</label>
        <input type="text" name="nascimento" placeholder="__/__/____" value={form.nascimento} onChange={handleChange} />
        {errors.nascimento && <span className="erro">{errors.nascimento}</span>}

        <label>Telefone</label>
        <input type="text" name="telefone" value={form.telefone} onChange={handleChange} />
        {errors.telefone && <span className="erro">{errors.telefone}</span>}

        <label>SENHA</label>
        <input type="password" name="senha" value={form.senha} onChange={handleChange} />
        {errors.senha && <span className="erro">{errors.senha}</span>}

        <label>CONFIRME A SENHA</label>
        <input type="password" name="confirmarSenha" value={form.confirmarSenha} onChange={handleChange} />
        {errors.confirmarSenha && <span className="erro">{errors.confirmarSenha}</span>}

        <button type="submit" className="btn-criar">CRIAR CONTA</button>
      </form>

      <Link to="/ajuda" className="link-ajuda">Precisando de Ajuda?</Link>
    </div>
  );
}

export default RegisterPage;
