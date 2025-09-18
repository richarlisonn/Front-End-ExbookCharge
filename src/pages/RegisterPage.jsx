import React, { useState, useTransition } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from "../assets/images/icon.png";
import './styles/RegisterPage.css';
import axios from 'axios';
import { SignUpValidator } from '../validators/user/SignUpUserValidator';

function RegisterPage() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  
  const [form, setForm] = useState({
    nome_completo: '',
    email: '',
    nascimento: '',
    telefone: '',
    senha: '',
    confirmarSenha: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    const [day, month, year] = form.nascimento.split("/");
    const date = `${year}-${month}-${day}`;

    startTransition(async () => {
      const token = axios.get(import.meta.env.VITE_BASE_URL + "authentication/csrf-token/")
      .then((response) => {
        localStorage.setItem("csrf-token", response.data.data);
        return response.data.data;
      })
      .catch((error) => {console.log(error); setErrors({server: "Erro em requisitar CSRF token para o servidor", details: error}); return;});

      if (!token) {
        setErrors({server: "Token CSRF não encontrado", details: error})
        return;
      };

      const responseSignUp = axios.post(import.meta.env.VITE_BASE_URL + "users/", 
        {
          full_name: form.nome_completo,
          date_birth: date,  
          email: form.email,
          phone: form.telefone,
          password: form.senha
        },
        {
          headers: {
          "X-CSRFToken": token
        }
      })
      .then(response => {
        console.log(response);

        if (response.status !== 201) {
          setErrors({server: "Erro ao registrar usuário!", details: error});
          return;
        };
        
        setSuccessMessage({server: "Usuário registrado com sucesso!", details: responseSignUp});

        axios.post(import.meta.env.VITE_BASE_URL + "authentication/login/", {
          email: form.email,
          password: form.senha
        },
        {
          headers: {
            "X-CSRFToken": token
          }
        })
        .then(response => {
          console.log({message: "Login automático realizado com sucesso!"});

        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        navigate("/dashboard");
        })
        .catch(error => {
          setErrors({server: "Erro ao realizar login automático!", details: error});
          console.log({message: "Erro ao realizar login automático!", details: error});
        });

        return;
      })
      .catch(error => {console.log(error); setErrors({server: "Erro ao requisitar o servidor para registrar o usuário!", details: error}); return error});

    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.nome_completo) newErrors.full_name = 'campo obrigatório*';
    if (!form.email) newErrors.email = 'campo obrigatório*';
    if (!form.nascimento) newErrors.date_birth = 'campo obrigatório*';
    if (!form.telefone) newErrors.phone = 'campo obrigatório*';
    if (!form.senha) newErrors.password = 'campo obrigatório*';
    if (!form.confirmarSenha) newErrors.confirmPassword = 'campo obrigatório*';
    if (form.senha && form.confirmarSenha && form.senha !== form.confirmarSenha) {
      newErrors.confirmPassword = 'as senhas não coincidem*';
    }

    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      const validate = SignUpValidator.validate({
            full_name: form.nome_completo,
            date_birth: form.nascimento,  
            email: form.email,
            phone: form.telefone,
            password: form.senha
          });
  
      if (validate.status === "error") {
        const fieldErrors = {};
    
        for (const [field, messages] of Object.entries(validate.errors)) {
          fieldErrors[field] = messages.join(", ");
        }
  
        setErrors(fieldErrors);
        return;
      };
    };
    
    if (Object.keys(newErrors).length === 0) {
      handleRegister();
    };
  };

  return (
    <div className="register-container">
      <img src={Icon} alt="Logo" className="logo_RegisterPage" />

      <form className="form" onSubmit={handleSubmit}>
        <h2>REGISTRO</h2>

        <label>NOME COMPLETO</label>
        <input type="text" name="nome_completo" value={form.nome_completo} onChange={handleChange} />
        {errors.full_name && <span className="erro">{errors.full_name}</span>}

        <label>DATA NASCIMENTO</label>
        <input type="text"  placeholder="DD/MM/AAAA" pattern="\d{2}/\d{2}/\d{4}" name="nascimento" value={form.nascimento} onChange={handleChange} />
        {errors.date_birth && <span className="erro">{errors.date_birth}</span>}

        <label>Telefone</label>
        <input
          type="tel"
          name="telefone"
          value={form.telefone}
          onChange={(e) => {
            let value = e.target.value;

            if (!value.startsWith("+55")) {
              value = "+55" + value.replace(/\D/g, ""); 
            }
            
            
            if (value.length > 14) {
              value = value.slice(0, 14);
            }
            
            handleChange({
              target: { name: "telefone", value }
            });
          }}
          maxLength={14} 
        />
        {errors.phone && <span className="erro">{errors.phone}</span>}
          
        <label>EMAIL</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="erro">{errors.email}</span>}


        <label>SENHA</label>
        <input type="password" name="senha" value={form.senha} onChange={handleChange} />
        {errors.password && <span className="erro">{errors.password}</span>}

        <label>CONFIRME A SENHA</label>
        <input type="password" name="confirmarSenha" value={form.confirmarSenha} onChange={handleChange} />
        {errors.confirmPassword && <span className="erro">{errors.confirmPassword}</span>}

        <button type="submit" className="btn-criar" disabled={isPending}>
        {isPending ? "Criando conta..." : "CRIAR CONTA"}
        </button>
      </form>

      {successMessage && <p className="success">{successMessage.message}</p>}
      {errors.server && <p className="errors-server">{errors.server}{console.log({message: errors.server, details: errors.details})}</p>}

      <Link to="/ajuda" className="link-ajuda">Precisando de Ajuda?</Link>
    </div>
  );
}

export default RegisterPage;
