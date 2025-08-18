import Logo from "../assets/images/icon.png";
import { FaBars, FaBell, FaUser, FaSearch, FaHome, FaPlus, FaSignOutAlt } from "react-icons/fa";
import React, { useState } from "react";
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

      

    </div>
  );
};

export default PerfilUsuario;