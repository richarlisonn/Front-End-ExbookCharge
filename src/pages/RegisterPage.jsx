import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from "../assets/images/icon.png";
import './styles/RegisterPage.css';

function RegisterPage() {
  const [form, setForm] = useState({
    email: '',
    birthdate: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.email) newErrors.email = 'campo obrigatório*';
    if (!form.birthdate) newErrors.birthdate = 'campo obrigatório*';
    if (!form.phone) newErrors.phone = 'campo obrigatório*';
    if (!form.password) {
      newErrors.password = 'campo obrigatório*';
    } else if (form.password.length < 8) {
      newErrors.password = 'a senha deve ter no mínimo 8 caracteres*';
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'campo obrigatório*';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'as senhas não coincidem*';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Registro enviado com sucesso:', form);
      // aqui você pode chamar API ou redirecionar
    }
  };

  return (
    <div className="register-container">
      <img src={Icon} alt="Logo" className="logo_RegisterPage" />

      <form className="form" onSubmit={handleSubmit}>
        <h2>REGISTRO</h2>

        <label>EMAIL</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="erro">{errors.email}</span>}

        <label>DATA NASCIMENTO</label>
        <input type="date" name="birthdate" value={form.birthdate} onChange={handleChange} />
        {errors.birthdate && <span className="erro">{errors.birthdate}</span>}

        <label>Telefone</label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={(e) => {
            let value = e.target.value;

            if (!value.startsWith("+55")) {
              value = "+55" + value.replace(/\D/g, ""); 
            }

            if (value.length > 14) {
              value = value.slice(0, 14);
            }

            handleChange({
              target: { name: "phone", value }
            });
          }}
          maxLength={14} 
        />
        {errors.phone && <span className="erro">{errors.phone}</span>}

        <label>SENHA</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />
        {errors.password && <span className="erro">{errors.password}</span>}

        <label>CONFIRME A SENHA</label>
        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
        {errors.confirmPassword && <span className="erro">{errors.confirmPassword}</span>}

        <button type="submit" className="btn-criar">CRIAR CONTA</button>
      </form>

      <Link to="/ajuda" className="link-ajuda">Precisando de Ajuda?</Link>
    </div>
  );
}

export default RegisterPage;
