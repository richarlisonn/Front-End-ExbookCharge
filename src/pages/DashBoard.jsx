import React, { useState } from "react";
import Logo from "../assets/images/icon.png"; 
import { FaBars, FaUser, FaSearch, FaSignOutAlt } from "react-icons/fa";
import "./styles/DashBoard.css"; 

function DashBoard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const annouces = [
    { title: "Dom Casmurro", autor: "Machado de Assis", link: "/dom-casmurro" },
    { title: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", link: "/senhor-dos-aneis" },
    { title: "1984", autor: "George Orwell", link: "/1984" },
    { title: "Harry Potter", autor: "J.K. Rowling", link: "/harry-potter" },
  ];

  return (
    <div className="div_main">
     
      <header className="header">
        <FaBars className="icon" onClick={toggleMenu} /> 
        <a href="/dashboard">
          <img src={Logo} alt="Logo Exbook Change" className="logo_DashBoard" />
        </a>
        <div className="right-icons">
          <a href="/perfil"><FaUser className="icon" /></a>
        </div>
      </header>

      <hr className="divider" />

      
      {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}

     
      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="menu-header">
          <FaUser className="menu-icon" />
          <p>Name Profile</p>
        </div>
        <hr />
        <ul className="menu-list">
          <li><a href="/dashboard">Início</a></li>
          <li><a href="/CriarAnuncio">Criar Anúncio</a></li>
          <li><a href="/"><FaSignOutAlt /> Sair</a></li>
        </ul>
      </div>

      
      <div className="search-container">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Qual livro você procura?"
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>
      </div>

      
      <div className="ads-container">
        {annouces.map((livro, index) => (
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

export default DashBoard;
