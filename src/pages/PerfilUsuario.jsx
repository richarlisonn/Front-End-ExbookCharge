import React, { useState } from "react";
import Logo from "../assets/images/icon.png";
import { FaBars,FaUserCircle, FaEdit, FaBell,FaSyncAlt , FaUser, FaSearch, FaHome, FaPlus, FaSignOutAlt } from "react-icons/fa";
import './styles/PerfilUsuario.css'


function PerfilUsuario() {


  return (
    <div className="div_main">
      <header className="header">
        <FaBars className="icon" />
        <a href=""> <img src={Logo} alt="Logo Exbook Change" className="logo_DashBoard" /></a>
        <div className="right-icons">
          <a href="Perfil"><FaUser className="icon" /></a>
        </div>
      </header>

      <hr className="divider" />

      <section className="perfil">
         <FaUserCircle className="profile-icon" />
        <div className="profile-info">
          <h3>NAME</h3>
          <p>biografia</p>
        </div>
        <FaEdit className="edit-icon" />  
      </section>

      <hr className="divider" />
      
       <section className="stats">
        <h4>MINHA ESTATÍSTICAS</h4>
        <p className="number">00</p>
        <p>Anúncios</p>
      </section>

      <hr className="divider" />

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
        </div>
        



    </div>
  );
};

export default PerfilUsuario;