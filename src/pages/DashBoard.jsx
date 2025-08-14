import React, { useState } from "react";
import Logo from "../assets/images/icon.png"; 
import { FaBars, FaBell, FaUser, FaSearch, FaHome, FaPlus, FaSignOutAlt } from "react-icons/fa";
import "./styles/DashBoard.css"; 

function DashBoard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="div_main">
    
      <header className="header">
        <FaBars className="icon" onClick={toggleMenu} /> 
        <img src={Logo} alt="Logo Exbook Change" className="logo_DashBoard" />
        <div className="right-icons">
          <FaUser className="icon" />
        </div>
      </header>

      <hr className="divider" />

    
      {isMenuOpen && (
        <div className="side-menu">
          <div className="menu-header">
            <FaUser className="menu-icon" />
            <p>Name Profile</p>
            <hr />
          </div>
          <ul className="menu-list">
            <li><a href="/dashboard">Início</a></li>
            <li><a href="/dashboard">Criar Anúncio</a></li>
            <li><a href="/dashboard"><FaSignOutAlt /> Sair</a></li>
          </ul>
        </div>
      )}

     
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
        <a href="livro" className="ad-card">
          <div className="ad-image"></div>
          <div className="ad-info">
            <h3>TITLE</h3>
            <p>Autor</p>
          </div>
        </a>
        <a href="livro" className="ad-card">
          <div className="ad-image"></div>
          <div className="ad-info">
            <h3>TITLE</h3>
            <p>Autor</p>
          </div>
        </a>
        <a href="livro" className="ad-card">
          <div className="ad-image"></div>
          <div className="ad-info">
            <h3>TITLE</h3>
            <p>Autor</p>
          </div>
        </a>
        <a href="livro" className="ad-card">
          <div className="ad-image"></div>
          <div className="ad-info">
            <h3>TITLE</h3>
            <p>Autor</p>
          </div>
        </a>
      </div>

   
    </div>
  );
}

export default DashBoard;
