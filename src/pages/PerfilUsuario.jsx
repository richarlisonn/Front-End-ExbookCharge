import React, { useState } from "react";
import Logo from "../assets/images/icon.png";
import { FaBars, FaUserCircle, FaEdit, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./styles/PerfilUsuario.css";

function PerfilUsuario() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fecharMenu = () => {
    setIsMenuOpen(false);
  };

  const [usuario] = useState({
    nome: "João Silva",
    bio: "Apaixonado por literatura clássica e troca de livros.",
    anuncios: [
      { title: "Dom Casmurro", autor: "Machado de Assis", link: "/dom-casmurro" },
      { title: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", link: "/senhor-dos-aneis" },
    ],
  });

  return (
    <div className="div_main">
      <header className="header">
        <FaBars className="icon" onClick={toggleMenu} />
        <a href="/dashboard">
          <img src={Logo} alt="Logo Exbook Change" className="logo_DashBoard" />
        </a>
        <div className="right-icons">
          <a href="Perfil">
            <FaUser className="icon" />
          </a>
        </div>
      </header>

      <hr className="divider" />

      
      {isMenuOpen && <div className="overlay" onClick={fecharMenu}></div>}

    
      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="menu-header">
          <FaUser className="menu-icon" />
          <p>{usuario.nome}</p>
          <hr />
        </div>
        <ul className="menu-list">
          <li><a href="/dashboard">Início</a></li>
          <li><a href="/CriarAnuncio">Criar Anúncio</a></li>
          <li><a href="/dashboard"><FaSignOutAlt /> Sair</a></li>
        </ul>
      </div>

   
      <section className="perfil">
        <FaUserCircle className="profile-icon" />
        <div className="profile-info">
          <h3>{usuario.nome}</h3>
          <p>{usuario.bio}</p>
        </div>
        <a href="/editarperfil">
          <FaEdit className="edit-icon" />
        </a>
      </section>

      <hr className="divider" />

      
      <section className="stats">
        <h4>MINHAS ESTATÍSTICAS</h4>
        <p className="number">{usuario.anuncios.length}</p>
        <p>Anúncios</p>
      </section>

      <hr className="divider" />

  
      <div className="ads-container">
        {usuario.anuncios.map((livro, index) => (
          <a key={index} href={livro.link} className="ad-card">
            <div className="ad-image"></div>
            <div className="ad-info">
              <h3>{livro.title}</h3>
              <p>{livro.autor}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default PerfilUsuario;
